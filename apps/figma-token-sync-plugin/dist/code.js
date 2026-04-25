"use strict";
(function() {
  // .build-tmp/shared/types.js
  var __read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var __values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var STORAGE_KEY = "figma-token-sync-settings-v1";
  var GITHUB_TOKEN_STORAGE_KEY = "figma-token-sync-github-token-v1";
  var ALL_COLLECTIONS = "__all__";
  var ALL_THEMES = "__all_themes__";
  var DEFAULT_COMPONENT_TOKEN_PREFIXES = [
    "action_sheet",
    "avatar",
    "backtop",
    "badge",
    "button",
    "calendar",
    "cascader",
    "cell",
    "checkbox",
    "collapse",
    "dialog",
    "divider",
    "drawer",
    "dropdown_menu",
    "empty",
    "fab",
    "footer",
    "form",
    "icon",
    "image",
    "image_viewer",
    "indexes",
    "input",
    "link",
    "loading",
    "message",
    "navbar",
    "notice_bar",
    "picker",
    "popover",
    "popup",
    "progress",
    "radio",
    "rate",
    "refresh",
    "result",
    "search",
    "sidebar",
    "skeleton",
    "slider",
    "stepper",
    "steps",
    "swipe_cell",
    "swiper",
    "switch",
    "tabbar",
    "table",
    "tabs",
    "tag",
    "text",
    "textarea",
    "time_counter",
    "toast",
    "tree",
    "upload"
  ].join(", ");
  function defaultFilePath(format) {
    if (format === "design-system") {
      return "docs/design-system/tokens.md";
    }
    return format === "md" ? "artifacts/flutter/colors.md" : "artifacts/css/colors.css";
  }
  function defaultCssFilePath() {
    return "artifacts/css/theme.css";
  }
  function defaultFlutterFilePath(themeId) {
    void themeId;
    return "packages/flutter/rdesign_component/lib/src/theme/tokens/rdesign_theme_tokens.dart";
  }
  function defaultThemeId(sourceName) {
    void sourceName;
    return "default";
  }
  var DEFAULT_SETTINGS = {
    repoOwner: "663548110",
    repoName: "hl-scene-design-system",
    branch: "main",
    filePath: defaultFilePath("design-system"),
    fullDataFilePath: "generated/figma-token-source.json",
    cssFilePath: defaultCssFilePath(),
    flutterFilePath: defaultFlutterFilePath("default"),
    format: "design-system",
    collectionId: ALL_COLLECTIONS,
    namePrefix: "rd",
    themeId: "default",
    selectedThemeIds: [ALL_THEMES],
    lightModeName: "",
    darkModeName: "",
    includeTokenEntries: false,
    includeFullData: true,
    includeCssTheme: true,
    includeFlutterTheme: true,
    componentTokenPrefixes: DEFAULT_COMPONENT_TOKEN_PREFIXES,
    commitMessage: "chore(tokens): sync figma design tokens"
  };
  function normalizeSettings(maybeSettings, sourceName) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var format = (maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.format) === "md" || (maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.format) === "css" || (maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.format) === "design-system" ? maybeSettings.format : DEFAULT_SETTINGS.format;
    var themeId = normalizeThemeId(((_a = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.themeId) === null || _a === void 0 ? void 0 : _a.trim()) || defaultThemeId(sourceName));
    return {
      repoOwner: (_c = (_b = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.repoOwner) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : DEFAULT_SETTINGS.repoOwner,
      repoName: (_e = (_d = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.repoName) === null || _d === void 0 ? void 0 : _d.trim()) !== null && _e !== void 0 ? _e : DEFAULT_SETTINGS.repoName,
      branch: ((_f = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.branch) === null || _f === void 0 ? void 0 : _f.trim()) || DEFAULT_SETTINGS.branch,
      filePath: ((_g = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.filePath) === null || _g === void 0 ? void 0 : _g.trim()) || defaultFilePath(format),
      fullDataFilePath: ((_h = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.fullDataFilePath) === null || _h === void 0 ? void 0 : _h.trim()) || DEFAULT_SETTINGS.fullDataFilePath,
      cssFilePath: normalizeOutputPath((_j = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.cssFilePath) === null || _j === void 0 ? void 0 : _j.trim(), DEFAULT_SETTINGS.cssFilePath),
      flutterFilePath: normalizeOutputPath((_k = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.flutterFilePath) === null || _k === void 0 ? void 0 : _k.trim(), defaultFlutterFilePath(themeId)),
      format: format,
      collectionId: ((_l = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.collectionId) === null || _l === void 0 ? void 0 : _l.trim()) || DEFAULT_SETTINGS.collectionId,
      namePrefix: ((_m = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.namePrefix) === null || _m === void 0 ? void 0 : _m.trim()) || DEFAULT_SETTINGS.namePrefix,
      themeId: themeId,
      selectedThemeIds: normalizeStringArray(maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.selectedThemeIds, DEFAULT_SETTINGS.selectedThemeIds),
      lightModeName: (_p = (_o = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.lightModeName) === null || _o === void 0 ? void 0 : _o.trim()) !== null && _p !== void 0 ? _p : DEFAULT_SETTINGS.lightModeName,
      darkModeName: (_r = (_q = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.darkModeName) === null || _q === void 0 ? void 0 : _q.trim()) !== null && _r !== void 0 ? _r : DEFAULT_SETTINGS.darkModeName,
      includeTokenEntries: false,
      includeFullData: normalizeBoolean(maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.includeFullData, DEFAULT_SETTINGS.includeFullData),
      includeCssTheme: normalizeBoolean(maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.includeCssTheme, DEFAULT_SETTINGS.includeCssTheme),
      includeFlutterTheme: normalizeBoolean(maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.includeFlutterTheme, DEFAULT_SETTINGS.includeFlutterTheme),
      componentTokenPrefixes: ((_s = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.componentTokenPrefixes) === null || _s === void 0 ? void 0 : _s.trim()) || DEFAULT_SETTINGS.componentTokenPrefixes,
      commitMessage: ((_t = maybeSettings === null || maybeSettings === void 0 ? void 0 : maybeSettings.commitMessage) === null || _t === void 0 ? void 0 : _t.trim()) || DEFAULT_SETTINGS.commitMessage
    };
  }
  function normalizeBoolean(value, fallback) {
    return typeof value === "boolean" ? value : fallback;
  }
  function normalizeStringArray(value, fallback) {
    var e_1, _a;
    if (!Array.isArray(value)) {
      return __spreadArray([], __read(fallback), false);
    }
    var normalized = [];
    try {
      for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
        var item = value_1_1.value;
        if (typeof item !== "string") {
          continue;
        }
        var trimmed = normalizeThemeId(item.trim());
        if (trimmed && normalized.indexOf(trimmed) === -1) {
          normalized.push(trimmed);
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    return normalized;
  }
  function normalizeThemeId(value) {
    return value === "2_0_flutter" ? "default" : value;
  }
  function normalizeOutputPath(value, fallback) {
    if (!value) {
      return fallback;
    }
    if (value.indexOf("tokens/css/") === 0) {
      return "artifacts/css/".concat(value.slice("tokens/css/".length));
    }
    if (value.indexOf("tokens/flutter/") === 0) {
      return fallback;
    }
    if (value.indexOf("artifacts/flutter/") === 0) {
      return fallback;
    }
    if (/^artifacts\/flutter\/rd_.+_theme\.dart$/.test(value)) {
      return fallback;
    }
    return value;
  }

  // .build-tmp/code.js
  var __assign = function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var __read2 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray2 = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var __values2 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var GITHUB_READ_TIMEOUT_MS = 3e4;
  var GITHUB_WRITE_TIMEOUT_MS = 12e4;
  var GITHUB_BODY_TIMEOUT_MS = 6e4;
  var BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  figma.showUI(__html__, {
    width: 560,
    height: 760,
    title: "Figma Token Sync",
    themeColors: true
  });
  void bootstrap();
  function bootstrap() {
    return __awaiter(this, void 0, void 0, function() {
      var _a, storedSettings, githubToken, snapshot, settings;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            return [4, Promise.all([
              readStoredSettings(),
              readStoredGithubToken(),
              buildSnapshot()
            ])];
          case 1:
            _a = __read2.apply(void 0, [_b.sent(), 3]), storedSettings = _a[0], githubToken = _a[1], snapshot = _a[2];
            settings = normalizeSettings(storedSettings, snapshot.fileName);
            figma.ui.postMessage({
              type: "init",
              snapshot: snapshot,
              settings: settings,
              githubToken: githubToken
            });
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  figma.ui.onmessage = function(message) {
    return __awaiter(void 0, void 0, void 0, function() {
      var typedMessage, snapshot, settings, result, payload, result, error_1, errorMessage;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!message || typeof message !== "object" || !("type" in message)) {
              return [
                2
                /*return*/
              ];
            }
            typedMessage = message;
            if (!(typedMessage.type === "refresh")) return [3, 2];
            return [4, buildSnapshot()];
          case 1:
            snapshot = _a.sent();
            figma.ui.postMessage({ type: "snapshot", snapshot: snapshot });
            return [
              2
              /*return*/
            ];
          case 2:
            if (!(typedMessage.type === "save-settings")) return [3, 4];
            settings = normalizeIncomingSettings(message);
            return [4, writeStoredSettings(settings)];
          case 3:
            _a.sent();
            return [
              2
              /*return*/
            ];
          case 4:
            if (!(typedMessage.type === "save-github-token")) return [3, 6];
            return [4, writeStoredGithubToken(normalizeIncomingGithubToken(message))];
          case 5:
            result = _a.sent();
            figma.ui.postMessage({
              type: "github-token-save-result",
              result: result
            });
            return [
              2
              /*return*/
            ];
          case 6:
            if (!(typedMessage.type === "sync-to-github")) return [3, 11];
            payload = message;
            result = void 0;
            _a.label = 7;
          case 7:
            _a.trys.push([7, 9, , 10]);
            return [4, syncToGitHub(payload.payload, emitSyncLog)];
          case 8:
            result = _a.sent();
            return [3, 10];
          case 9:
            error_1 = _a.sent();
            errorMessage = "\u540C\u6B65\u8FC7\u7A0B\u4E2D\u53D1\u751F\u5F02\u5E38\uFF1A".concat(formatUnknownError(error_1));
            emitSyncLog("error", errorMessage);
            result = {
              ok: false,
              error: errorMessage
            };
            return [3, 10];
          case 10:
            figma.ui.postMessage({ type: "sync-result", result: result });
            if (result.ok) {
              figma.notify("Token \u6587\u4EF6\u5DF2\u540C\u6B65\u5230 GitHub\u3002");
            }
            return [
              2
              /*return*/
            ];
          case 11:
            if (typedMessage.type === "close") {
              figma.closePlugin();
            }
            return [
              2
              /*return*/
            ];
        }
      });
    });
  };
  function emitSyncLog(level, message, filePath) {
    var entry = {
      level: level,
      message: message,
      filePath: filePath,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    figma.ui.postMessage({
      type: "sync-log",
      entry: entry
    });
  }
  function buildSnapshot() {
    return __awaiter(this, void 0, void 0, function() {
      var _a, collections, variables;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            return [4, Promise.all([
              figma.variables.getLocalVariableCollectionsAsync(),
              figma.variables.getLocalVariablesAsync()
            ])];
          case 1:
            _a = __read2.apply(void 0, [_b.sent(), 2]), collections = _a[0], variables = _a[1];
            return [2, {
              fileName: figma.root.name,
              generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
              collections: collections.map(serializeCollection),
              variables: variables.map(serializeVariable)
            }];
        }
      });
    });
  }
  function serializeCollection(collection) {
    return {
      id: collection.id,
      name: collection.name,
      defaultModeId: collection.defaultModeId,
      modes: collection.modes.map(function(mode) {
        return {
          modeId: mode.modeId,
          name: mode.name,
          isDefault: mode.modeId === collection.defaultModeId
        };
      })
    };
  }
  function serializeVariable(variable) {
    var valuesByMode = {};
    for (var modeId in variable.valuesByMode) {
      valuesByMode[modeId] = serializeValue(variable.valuesByMode[modeId]);
    }
    return {
      id: variable.id,
      key: variable.key,
      name: variable.name,
      description: variable.description,
      collectionId: variable.variableCollectionId,
      resolvedType: variable.resolvedType,
      hiddenFromPublishing: variable.hiddenFromPublishing,
      scopes: __spreadArray2([], __read2(variable.scopes), false),
      valuesByMode: valuesByMode
    };
  }
  function serializeValue(value) {
    if (isVariableAlias(value)) {
      return {
        kind: "alias",
        id: value.id
      };
    }
    if (isRgba(value)) {
      return {
        kind: "rgba",
        r: value.r,
        g: value.g,
        b: value.b,
        a: typeof value.a === "number" ? value.a : 1
      };
    }
    if (typeof value === "number") {
      return {
        kind: "number",
        value: value
      };
    }
    if (typeof value === "string") {
      return {
        kind: "string",
        value: value
      };
    }
    if (typeof value === "boolean") {
      return {
        kind: "boolean",
        value: value
      };
    }
    return {
      kind: "unsupported"
    };
  }
  function isVariableAlias(value) {
    return typeof value === "object" && value !== null && "type" in value && value.type === "VARIABLE_ALIAS";
  }
  function isRgba(value) {
    return typeof value === "object" && value !== null && "r" in value && "g" in value && "b" in value && typeof value.r === "number" && typeof value.g === "number" && typeof value.b === "number";
  }
  function normalizeIncomingSettings(message) {
    if (!message || typeof message !== "object" || !("settings" in message) || typeof message.settings !== "object" || message.settings === null) {
      return DEFAULT_SETTINGS;
    }
    return normalizeSettings(message.settings);
  }
  function normalizeIncomingGithubToken(message) {
    if (!message || typeof message !== "object" || !("githubToken" in message) || typeof message.githubToken !== "string") {
      return "";
    }
    return message.githubToken.trim();
  }
  function syncToGitHub(payload, log) {
    return __awaiter(this, void 0, void 0, function() {
      var settings, token, tokenStorageResult, headers, fileUrls, _a, _b, file, result, error_2, errorMessage, e_1_1;
      var e_1, _c;
      var _d, _e;
      return __generator(this, function(_f) {
        switch (_f.label) {
          case 0:
            if (!payload) {
              log("error", "\u7F3A\u5C11\u540C\u6B65\u53C2\u6570\u3002");
              return [2, {
                ok: false,
                error: "\u7F3A\u5C11\u540C\u6B65\u53C2\u6570\u3002"
              }];
            }
            settings = normalizeSettings(payload.settings);
            token = payload.githubToken.trim();
            if (!token) {
              log("error", "\u7F3A\u5C11 GitHub Personal Access Token\u3002");
              return [2, {
                ok: false,
                error: "\u8BF7\u8F93\u5165 GitHub Personal Access Token\u3002"
              }];
            }
            if (!settings.repoOwner || !settings.repoName) {
              log("error", "GitHub \u4ED3\u5E93\u4FE1\u606F\u4E0D\u5B8C\u6574\u3002");
              return [2, {
                ok: false,
                error: "\u8BF7\u5148\u8865\u5168 GitHub \u4ED3\u5E93\u3002"
              }];
            }
            if (payload.files.length === 0 || payload.files.some(function(file2) {
              return !file2.path.trim();
            })) {
              log("error", "\u540C\u6B65\u6587\u4EF6\u8DEF\u5F84\u4E3A\u7A7A\u3002");
              return [2, {
                ok: false,
                error: "\u8BF7\u5148\u8865\u5168\u540C\u6B65\u6587\u4EF6\u8DEF\u5F84\u3002"
              }];
            }
            log("info", "\u51C6\u5907\u540C\u6B65\u5230 ".concat(settings.repoOwner, "/").concat(settings.repoName, "#").concat(settings.branch, "\uFF0C\u5171 ").concat(payload.files.length, " \u4E2A\u6587\u4EF6\u3002"));
            return [4, writeStoredSettings(settings)];
          case 1:
            _f.sent();
            return [4, writeStoredGithubToken(token)];
          case 2:
            tokenStorageResult = _f.sent();
            if (tokenStorageResult.ok) {
              log("success", "GitHub Token \u5DF2\u4FDD\u5B58\u5230\u672C\u673A\u63D2\u4EF6\u5B58\u50A8\u3002");
            } else if (tokenStorageResult.error) {
              log("warning", tokenStorageResult.error);
            }
            headers = {
              Authorization: "Bearer ".concat(token),
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28"
            };
            fileUrls = [];
            _f.label = 3;
          case 3:
            _f.trys.push([3, 10, 11, 12]);
            _a = __values2(payload.files), _b = _a.next();
            _f.label = 4;
          case 4:
            if (!!_b.done) return [3, 9];
            file = _b.value;
            _f.label = 5;
          case 5:
            _f.trys.push([5, 7, , 8]);
            return [4, syncGitHubFile(settings, file, headers, log)];
          case 6:
            result = _f.sent();
            if (!result.ok) {
              log("error", result.error, file.path);
              return [2, result];
            }
            fileUrls.push({
              path: file.path,
              url: result.fileUrl
            });
            return [3, 8];
          case 7:
            error_2 = _f.sent();
            errorMessage = formatUnknownError(error_2);
            log("error", errorMessage, file.path);
            return [2, {
              ok: false,
              error: errorMessage
            }];
          case 8:
            _b = _a.next();
            return [3, 4];
          case 9:
            return [3, 12];
          case 10:
            e_1_1 = _f.sent();
            e_1 = { error: e_1_1 };
            return [3, 12];
          case 11:
            try {
              if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            } finally {
              if (e_1) throw e_1.error;
            }
            return [
              7
              /*endfinally*/
            ];
          case 12:
            log("success", "\u540C\u6B65\u5B8C\u6210\uFF0C\u5DF2\u5199\u5165 ".concat(fileUrls.length, " \u4E2A\u6587\u4EF6\u3002"));
            return [2, {
              ok: true,
              fileUrl: (_e = (_d = fileUrls[0]) === null || _d === void 0 ? void 0 : _d.url) !== null && _e !== void 0 ? _e : "",
              fileUrls: fileUrls
            }];
        }
      });
    });
  }
  function syncGitHubFile(settings, file, headers, log) {
    return __awaiter(this, void 0, void 0, function() {
      var encodedPath, contentUrl, sha, readResponse, existing, error, content, writeResponse, error, fileUrl;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            encodedPath = encodeGitHubPath(file.path);
            contentUrl = "https://api.github.com/repos/".concat(encodeURIComponent(settings.repoOwner), "/").concat(encodeURIComponent(settings.repoName), "/contents/").concat(encodedPath);
            log("info", "\u5F00\u59CB\u5904\u7406 ".concat(file.label, " \u6587\u4EF6\u3002"), file.path);
            log("info", "\u8BFB\u53D6\u8FDC\u7A0B\u6587\u4EF6\u72B6\u6001\u3002", file.path);
            return [4, fetchGitHubApi("".concat(contentUrl, "?ref=").concat(encodeURIComponent(settings.branch)), {
              method: "GET",
              headers: headers
            }, "GET \u8FDC\u7A0B\u6587\u4EF6", file.path, log, GITHUB_READ_TIMEOUT_MS)];
          case 1:
            readResponse = _a.sent();
            if (!readResponse.ok) return [3, 3];
            return [4, readGitHubJson(readResponse, "\u8BFB\u53D6\u8FDC\u7A0B\u6587\u4EF6 JSON", file.path, log)];
          case 2:
            existing = _a.sent();
            sha = existing.sha;
            log("success", sha ? "\u5DF2\u8BFB\u53D6\u8FDC\u7A0B\u6587\u4EF6\uFF0C\u5C06\u57FA\u4E8E\u73B0\u6709\u6587\u4EF6\u66F4\u65B0\u3002" : "\u8FDC\u7A0B\u6587\u4EF6\u53EF\u8BBF\u95EE\uFF0C\u5C06\u7EE7\u7EED\u66F4\u65B0\u3002", file.path);
            return [3, 6];
          case 3:
            if (!(readResponse.status !== 404)) return [3, 5];
            return [4, extractGitHubError(readResponse)];
          case 4:
            error = _a.sent();
            return [2, {
              ok: false,
              error: "".concat(file.path, ": ").concat(error)
            }];
          case 5:
            log("info", "\u8FDC\u7A0B\u6587\u4EF6\u4E0D\u5B58\u5728\uFF0C\u5C06\u521B\u5EFA\u65B0\u6587\u4EF6\u3002", file.path);
            _a.label = 6;
          case 6:
            content = file.content;
            log("info", "\u4F7F\u7528\u5168\u91CF\u8986\u76D6\u7B56\u7565\u51C6\u5907\u5199\u5165\u3002", file.path);
            log("info", "\u4E0A\u4F20\u6587\u4EF6\u5185\u5BB9\u5230 GitHub\u3002", file.path);
            log("info", "\u51C6\u5907\u4E0A\u4F20 ".concat(content.length, " \u5B57\u7B26\u3002"), file.path);
            return [4, fetchGitHubApi(contentUrl, {
              method: "PUT",
              headers: __assign(__assign({}, headers), { "Content-Type": "application/json" }),
              body: JSON.stringify(__assign({ message: settings.commitMessage, branch: settings.branch, content: base64EncodeUtf8(content) }, sha ? { sha: sha } : {}))
            }, "PUT \u5199\u5165\u6587\u4EF6", file.path, log, GITHUB_WRITE_TIMEOUT_MS)];
          case 7:
            writeResponse = _a.sent();
            if (!!writeResponse.ok) return [3, 9];
            return [4, extractGitHubError(writeResponse)];
          case 8:
            error = _a.sent();
            return [2, {
              ok: false,
              error: "".concat(file.path, ": ").concat(error)
            }];
          case 9:
            fileUrl = "https://github.com/".concat(settings.repoOwner, "/").concat(settings.repoName, "/blob/").concat(settings.branch, "/").concat(file.path);
            log("success", "\u5DF2\u5199\u5165 GitHub\uFF1A".concat(fileUrl), file.path);
            return [2, {
              ok: true,
              fileUrl: fileUrl,
              fileUrls: [
                {
                  path: file.path,
                  url: fileUrl
                }
              ]
            }];
        }
      });
    });
  }
  function fetchGitHubApi(url, init, label, filePath, log, timeoutMs) {
    return __awaiter(this, void 0, void 0, function() {
      var startedAt, response, error_3;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            startedAt = Date.now();
            log("info", "".concat(label, " \u8BF7\u6C42\u5DF2\u53D1\u51FA\uFF0C\u6700\u591A\u7B49\u5F85 ").concat(timeoutMs / 1e3, " \u79D2\u3002"), filePath);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4, withTimeout(fetch(url, init), timeoutMs, "".concat(label, " \u8D85\u8FC7 ").concat(timeoutMs / 1e3, " \u79D2\u6CA1\u6709\u54CD\u5E94\u3002\u8BF7\u68C0\u67E5 Figma \u7F51\u7EDC\u8BBF\u95EE\u3001\u4EE3\u7406\u6216 GitHub API \u8FDE\u63A5\u3002"))];
          case 2:
            response = _a.sent();
            log("info", "".concat(label, " \u6536\u5230 HTTP ").concat(response.status, "\uFF0C\u8017\u65F6 ").concat(Date.now() - startedAt, "ms\u3002"), filePath);
            return [2, response];
          case 3:
            error_3 = _a.sent();
            throw new Error("".concat(label, " \u5931\u8D25\uFF1A").concat(formatUnknownError(error_3)));
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  function readGitHubJson(response, label, filePath, log) {
    return __awaiter(this, void 0, void 0, function() {
      var rawText;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            log("info", label, filePath);
            return [4, readResponseText(response, label, filePath, log)];
          case 1:
            rawText = _a.sent();
            try {
              return [2, JSON.parse(rawText)];
            } catch (error) {
              throw new Error("".concat(label, " \u89E3\u6790\u5931\u8D25\uFF1A").concat(formatUnknownError(error)));
            }
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  function readResponseText(response, label, filePath, log) {
    return __awaiter(this, void 0, void 0, function() {
      var textReader, rawText;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            textReader = response.text;
            if (typeof textReader !== "function") {
              throw new Error("".concat(label, " \u5931\u8D25\uFF1A\u5F53\u524D Figma fetch Response \u4E0D\u652F\u6301 text()\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u54CD\u5E94\u4F53\u3002"));
            }
            return [4, withTimeout(Promise.resolve(textReader.call(response)), GITHUB_BODY_TIMEOUT_MS, "".concat(label, " \u8D85\u8FC7 ").concat(GITHUB_BODY_TIMEOUT_MS / 1e3, " \u79D2\u6CA1\u6709\u5B8C\u6210\u3002"))];
          case 1:
            rawText = _a.sent();
            if (log) {
              log("info", "".concat(label, " \u54CD\u5E94\u4F53 ").concat(rawText.length, " \u5B57\u7B26\u3002"), filePath);
            }
            return [2, rawText];
        }
      });
    });
  }
  function withTimeout(promise, timeoutMs, timeoutMessage) {
    return new Promise(function(resolve, reject) {
      var settled = false;
      var timer = setTimeout(function() {
        if (settled) {
          return;
        }
        settled = true;
        reject(new Error(timeoutMessage));
      }, timeoutMs);
      promise.then(function(value) {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timer);
        resolve(value);
      }, function(error) {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timer);
        reject(error);
      });
    });
  }
  function encodeGitHubPath(filePath) {
    return filePath.split("/").filter(Boolean).map(function(segment) {
      return encodeURIComponent(segment);
    }).join("/");
  }
  function extractGitHubError(response) {
    return __awaiter(this, void 0, void 0, function() {
      var rawText, error_4, parsed, detail;
      var _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            rawText = "";
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, , 4]);
            return [4, readResponseText(response, "\u8BFB\u53D6 GitHub \u9519\u8BEF\u54CD\u5E94")];
          case 2:
            rawText = _b.sent();
            return [3, 4];
          case 3:
            error_4 = _b.sent();
            return [2, formatUnknownError(error_4)];
          case 4:
            try {
              parsed = JSON.parse(rawText);
              detail = Array.isArray(parsed.errors) && parsed.errors.length > 0 ? " ".concat(JSON.stringify(parsed.errors)) : "";
              return [2, "".concat((_a = parsed.message) !== null && _a !== void 0 ? _a : "GitHub API \u8BF7\u6C42\u5931\u8D25\u3002").concat(detail)];
            } catch (_c) {
              return [2, rawText || "GitHub API \u8BF7\u6C42\u5931\u8D25\uFF0C\u72B6\u6001\u7801 ".concat(response.status, "\u3002")];
            }
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  function formatUnknownError(error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    if (typeof error === "string") {
      return error;
    }
    try {
      return JSON.stringify(error) || "\u672A\u77E5\u9519\u8BEF\u3002";
    } catch (_a) {
      return "\u672A\u77E5\u9519\u8BEF\u3002";
    }
  }
  function base64EncodeUtf8(value) {
    return base64EncodeBinary(utf8ToBinary(value));
  }
  function utf8ToBinary(value) {
    return encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, function(_match, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    });
  }
  function base64EncodeBinary(binary) {
    var output = "";
    for (var index = 0; index < binary.length; index += 3) {
      var byte1 = binary.charCodeAt(index) & 255;
      var hasByte2 = index + 1 < binary.length;
      var hasByte3 = index + 2 < binary.length;
      var byte2 = hasByte2 ? binary.charCodeAt(index + 1) & 255 : 0;
      var byte3 = hasByte3 ? binary.charCodeAt(index + 2) & 255 : 0;
      var triplet = byte1 << 16 | byte2 << 8 | byte3;
      output += BASE64_ALPHABET.charAt(triplet >> 18 & 63);
      output += BASE64_ALPHABET.charAt(triplet >> 12 & 63);
      output += hasByte2 ? BASE64_ALPHABET.charAt(triplet >> 6 & 63) : "=";
      output += hasByte3 ? BASE64_ALPHABET.charAt(triplet & 63) : "=";
    }
    return output;
  }
  function readStoredSettings() {
    return __awaiter(this, void 0, void 0, function() {
      var storedSettings, error_5;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!canUseClientStorage()) {
              return [2, {}];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4, figma.clientStorage.getAsync(STORAGE_KEY)];
          case 2:
            storedSettings = _a.sent();
            return [2, storedSettings && typeof storedSettings === "object" ? storedSettings : {}];
          case 3:
            error_5 = _a.sent();
            console.warn("Client storage unavailable, falling back to defaults.", error_5);
            return [2, {}];
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  function readStoredGithubToken() {
    return __awaiter(this, void 0, void 0, function() {
      var token, error_6;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!canUseClientStorage()) {
              return [2, ""];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4, figma.clientStorage.getAsync(GITHUB_TOKEN_STORAGE_KEY)];
          case 2:
            token = _a.sent();
            return [2, typeof token === "string" ? token : ""];
          case 3:
            error_6 = _a.sent();
            console.warn("Client storage unavailable, falling back to empty GitHub token.", error_6);
            return [2, ""];
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  function writeStoredSettings(settings) {
    return __awaiter(this, void 0, void 0, function() {
      var error_7;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!canUseClientStorage()) {
              return [
                2
                /*return*/
              ];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4, figma.clientStorage.setAsync(STORAGE_KEY, settings)];
          case 2:
            _a.sent();
            return [3, 4];
          case 3:
            error_7 = _a.sent();
            console.warn("Client storage unavailable, skipping persistence.", error_7);
            return [3, 4];
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  function writeStoredGithubToken(githubToken) {
    return __awaiter(this, void 0, void 0, function() {
      var error_8;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!canUseClientStorage()) {
              return [2, {
                ok: false,
                storage: "none",
                error: "\u5F53\u524D\u5F00\u53D1\u63D2\u4EF6\u6CA1\u6709 Figma plugin ID\uFF0CFigma \u4E0D\u5141\u8BB8\u6301\u4E45\u5316\u4FDD\u5B58\u3002\u8BF7\u7528 Figma \u7684 Create new plugin \u751F\u6210\u5E26 id \u7684 manifest \u540E\u518D\u5BFC\u5165\u3002"
              }];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, , 7]);
            if (!githubToken) return [3, 3];
            return [4, figma.clientStorage.setAsync(GITHUB_TOKEN_STORAGE_KEY, githubToken)];
          case 2:
            _a.sent();
            return [3, 5];
          case 3:
            return [4, figma.clientStorage.deleteAsync(GITHUB_TOKEN_STORAGE_KEY)];
          case 4:
            _a.sent();
            _a.label = 5;
          case 5:
            return [2, {
              ok: true,
              storage: "figma-client-storage"
            }];
          case 6:
            error_8 = _a.sent();
            console.warn("Client storage unavailable, skipping GitHub token persistence.", error_8);
            return [2, {
              ok: false,
              storage: "none",
              error: "GitHub Token \u4FDD\u5B58\u5931\u8D25\uFF0CFigma clientStorage \u5F53\u524D\u4E0D\u53EF\u7528\u3002"
            }];
          case 7:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  function canUseClientStorage() {
    return typeof figma.pluginId === "string" && figma.pluginId.length > 0;
  }
})();
