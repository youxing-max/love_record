#!/bin/bash

echo ""
echo "======================================"
echo "💕 恋爱时光记录系统 - 配置向导 💕"
echo "======================================"
echo ""
echo "正在启动配置程序..."
echo ""

python3 setup.py

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 配置失败！请检查 Python 是否已安装。"
    echo ""
    exit 1
fi

echo ""
echo "✅ 配置完成！"
echo ""
