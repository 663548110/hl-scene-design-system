#!/bin/bash

# 可以指定自己的Flutter SDK路径
# FLUTTER_SDK_PATH=~/tools/flutter

# 设置基础目录（脚本所在目录）
BASE_DIR="$( cd "$( dirname "$0" )" && pwd )"

# 检查 Flutter SDK 路径
if [ -n "$FLUTTER_SDK_PATH" ]; then
  FLUTTER_CMD="$FLUTTER_SDK_PATH/bin/flutter"
  echo "使用自定义Flutter路径: $FLUTTER_CMD"
else
  FLUTTER_CMD="flutter"
  echo "使用系统默认Flutter命令"
fi

# 获取Flutter版本号
FLUTTER_VERSION=$($FLUTTER_CMD --version 2>/dev/null | awk '/Flutter/{print $2}')
if [ -z "$FLUTTER_VERSION" ]; then
  echo "❌ 错误：无法获取Flutter版本号" >&2
  exit 1
fi
echo "检测到Flutter版本: $FLUTTER_VERSION"

cd $BASE_DIR

# 在基础目录执行清理和依赖安装
echo "在 $BASE_DIR 执行清理操作..."
$FLUTTER_CMD clean

rm -f $BASE_DIR/pubspec.lock
rm -f $BASE_DIR/example/pubspec.lock

echo "获取项目依赖..."

$FLUTTER_CMD pub get

echo "✅ 所有操作完成"
