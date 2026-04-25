import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:rdesign_flutter/rdesign_flutter.dart';
import 'package:rdesign_flutter/src/util/log.dart';

import 'base/example_route.dart';
import 'base/intl_resource_delegate.dart';
import 'config.dart';
import 'home.dart';
import 'l10n/app_localizations.dart';
import 'provider/locale_provider.dart';
import 'provider/theme_mode_provider.dart';
import 'util/web_theme_listener.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  kTextForceVerticalCenterEnable = false;

  // Web 不支持 setPreferredOrientations，跳过
  if (!kIsWeb) {
    await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  }

  Log.setCustomLogPrinter((level, tag, msg) => print('[$level] $tag ==> $msg'));

  // 必须在 runApp 之前填充，路由表构建时需要用到
  exampleMap.forEach((key, value) {
    for (final model in value) {
      examplePageList.add(model);
    }
  });
  for (final model in sideBarExamplePage) {
    examplePageList.add(model);
  }

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late TDThemeData _themeData;

  @override
  void initState() {
    super.initState();
    _themeData = TDThemeData.defaultData();
  }

  @override
  Widget build(BuildContext context) {
    TDTheme.needMultiTheme();
    final delegate = IntlResourceDelegate(context);

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) {
            final provider = ThemeModeProvider();
            WidgetsBinding.instance.addPostFrameCallback((_) async {
              if (provider.themeMode == ThemeMode.system) {
                await provider.initThemeMode();
              }
            });
            return provider;
          },
        ),
        ChangeNotifierProvider(
          create: (_) {
            final provider = LocaleProvider();
            WidgetsBinding.instance.addPostFrameCallback((_) async {
              await provider.initLocale();
            });
            return provider;
          },
        ),
      ],
      child: Consumer2<ThemeModeProvider, LocaleProvider>(
        builder: (context, themeModeProvider, localeProvider, child) {
          if (kIsWeb) {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              setupThemeModeListener(themeModeProvider);
            });
          }

          return MaterialApp(
            title: 'RDesign Flutter Example',
            theme: _themeData.systemThemeDataLight,
            darkTheme: _themeData.systemThemeDataDark,
            themeMode: themeModeProvider.themeMode,
            home: Builder(
              builder: (context) {
                TDTheme.setResourceBuilder(
                  (context) => delegate..updateContext(context),
                  needAlwaysBuild: true,
                );
                return MyHomePage(
                  title: kIsWeb
                      ? 'RDesign Flutter 组件库'
                      : (AppLocalizations.of(context)?.components ?? ''),
                  onThemeChange: kIsWeb
                      ? null
                      : (themeData) {
                          setState(() {
                            _themeData = themeData;
                          });
                        },
                );
              },
            ),
            locale: localeProvider.locale,
            supportedLocales: AppLocalizations.supportedLocales,
            localizationsDelegates: AppLocalizations.localizationsDelegates,
            onGenerateRoute: TDExampleRoute.onGenerateRoute,
          );
        },
      ),
    );
  }
}
