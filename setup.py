#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
恋爱时光记录系统 - 配置脚本
用于生成个性化配置文件
"""

import json
import os
import sys
from datetime import datetime

# Windows 控制台编码修复
if sys.platform == 'win32':
    try:
        import codecs
        if hasattr(sys.stdout, 'buffer'):
            sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
            sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')
    except:
        pass  # 如果已经被包装过，忽略错误


def clear_screen():
    """清屏"""
    os.system('cls' if os.name == 'nt' else 'clear')


def print_header():
    """打印欢迎头部"""
    print("=" * 60)
    print("💕 恋爱时光记录系统 - 配置向导 💕")
    print("=" * 60)
    print()


def get_input(prompt, default=None):
    """获取用户输入"""
    if default:
        prompt = f"{prompt} (默认: {default}): "
    else:
        prompt = f"{prompt}: "

    value = input(prompt).strip()
    return value if value else default


def validate_date(date_str):
    """验证日期格式"""
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False


def main():
    """主函数"""
    clear_screen()
    print_header()

    print("👋 欢迎使用恋爱时光记录系统配置向导！")
    print("📝 请按照提示输入信息，生成您的专属配置。\n")

    # 1. 获取第一个人的名字缩写
    print("━" * 60)
    print("💑 第一步：输入情侣双方名字")
    print("━" * 60)
    person1_name = get_input("请输入第一个人的名字缩写（大写，例如: XXX）")
    while not person1_name or not person1_name.isupper():
        print("❌ 请输入有效的大写缩写！")
        person1_name = get_input("请输入第一个人的名字缩写（大写，例如: XXXX）")

    # 2. 获取第二个人的名字缩写
    person2_name = get_input("请输入第二个人的名字缩写（大写，例如:XXX）")
    while not person2_name or not person2_name.isupper():
        print("❌ 请输入有效的大写缩写！")
        person2_name = get_input("请输入第二个人的名字缩写（大写，例如: XXX）")

    # 3. 获取恋爱开始日期
    print("\n" + "━" * 60)
    print("📅 第二步：输入恋爱开始日期")
    print("━" * 60)
    love_date = get_input("请输入恋爱开始日期（格式: YYYY-MM-DD，例如: 2025-06-24）")
    while not love_date or not validate_date(love_date):
        print("❌ 日期格式错误！请使用 YYYY-MM-DD 格式。")
        love_date = get_input("请输入恋爱开始日期（格式: YYYY-MM-DD，例如: 2025-06-24）")

    # 4. 设置账号密码
    print("\n" + "━" * 60)
    print("🔐 第三步：设置登录账号密码")
    print("━" * 60)
    print("ℹ️  默认情况下，账号和密码都是名字缩写。")
    use_default = get_input(f"是否使用默认设置？({person1_name}/{person1_name} 和 {person2_name}/{person2_name}) [Y/n]", "Y")

    if use_default.lower() in ['y', 'yes', '']:
        user1_username = person1_name
        user1_password = person1_name
        user2_username = person2_name
        user2_password = person2_name
    else:
        print(f"\n设置 {person1_name} 的账号:")
        user1_username = get_input(f"  用户名", person1_name)
        user1_password = get_input(f"  密码", person1_name)

        print(f"\n设置 {person2_name} 的账号:")
        user2_username = get_input(f"  用户名", person2_name)
        user2_password = get_input(f"  密码", person2_name)

    # 5. 生成配置
    print("\n" + "━" * 60)
    print("⚙️  正在生成配置...")
    print("━" * 60)

    config = {
        "couple_names": {
            "person1": person1_name,
            "person2": person2_name
        },
        "love_start_date": love_date,
        "users": [
            {
                "username": user1_username,
                "password": user1_password
            },
            {
                "username": user2_username,
                "password": user2_password
            }
        ],
        "title": f"{person1_name}❤️{person2_name} - 恋爱时光记录系统"
    }

    # 6. 保存配置文件
    config_path = os.path.join(os.path.dirname(__file__), 'config.json')
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)

    # 7. 显示总结
    print("\n✅ 配置生成成功！")
    print("\n" + "=" * 60)
    print("📋 配置信息总结")
    print("=" * 60)
    print(f"💑 情侣名字: {person1_name} ❤️ {person2_name}")
    print(f"📅 恋爱开始日期: {love_date}")
    print(f"👤 账号1: {user1_username} / {user1_password}")
    print(f"👤 账号2: {user2_username} / {user2_password}")
    print(f"📄 配置文件: {config_path}")
    print("=" * 60)

    # 8. 应用配置
    print("\n" + "━" * 60)
    print("🔧 第四步：应用配置到系统")
    print("━" * 60)
    apply = get_input("是否立即应用配置到系统文件？[Y/n]", "Y")

    if apply.lower() in ['y', 'yes', '']:
        apply_config(config)
        print("\n✅ 配置已成功应用到系统！")
        print("🚀 您现在可以启动系统使用了。")
    else:
        print("\nℹ️  配置文件已保存，您可以稍后手动应用。")
        print(f"   运行命令: python {os.path.join(os.path.dirname(__file__), 'apply_config.py')}")

    print("\n💕 感谢使用恋爱时光记录系统！祝您幸福！💕\n")


def apply_config(config):
    """应用配置到系统文件"""
    # 1. 修改 frontend/index.html
    html_path = os.path.join(os.path.dirname(__file__), 'frontend', 'index.html')
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # 替换标题 - 使用 XXXXX 占位符
        html_content = html_content.replace('XXXXX❤️XXXXX - 恋爱时光记录系统', config['title'])
        html_content = html_content.replace('XXXXX❤️XXXXX', f"{config['couple_names']['person1']}❤️{config['couple_names']['person2']}")

        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"  ✓ 已更新: {html_path}")

    # 2. 修改 frontend/js/app.js
    js_path = os.path.join(os.path.dirname(__file__), 'frontend', 'js', 'app.js')
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js_content = f.read()

        # 替换用户验证列表 - 使用 XXXXX 占位符
        old_users = """const validUsers = [
            { username: 'XXXXX', password: 'XXXXX' },
            { username: 'XXXXX', password: 'XXXXX' }
        ];"""

        new_users = f"""const validUsers = [
            {{ username: '{config['users'][0]['username']}', password: '{config['users'][0]['password']}' }},
            {{ username: '{config['users'][1]['username']}', password: '{config['users'][1]['password']}' }}
        ];"""

        js_content = js_content.replace(old_users, new_users)

        # 替换 authenticateUser 函数中的用户列表 - 使用 XXXXX 占位符
        old_auth_users = """const validUsers = [
        { username: 'XXXXX', password: 'XXXXX' },
        { username: 'XXXXX', password: 'XXXXX' }
    ];"""

        new_auth_users = f"""const validUsers = [
        {{ username: '{config['users'][0]['username']}', password: '{config['users'][0]['password']}' }},
        {{ username: '{config['users'][1]['username']}', password: '{config['users'][1]['password']}' }}
    ];"""

        js_content = js_content.replace(old_auth_users, new_auth_users)

        # 替换恋爱开始日期 - 使用 2025-01-01 占位符
        js_content = js_content.replace("setLoveStartDate('2025-01-01')", f"setLoveStartDate('{config['love_start_date']}')")

        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"  ✓ 已更新: {js_path}")

    # 3. 在 index.html 中也更新开始日期 - 使用 2025-01-01 占位符
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()

        html_content = html_content.replace(
            '<span id="startDate">2025-01-01</span>',
            f'<span id="startDate">{config["love_start_date"]}</span>'
        )

        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ 配置已取消。")
        sys.exit(0)
    except Exception as e:
        print(f"\n\n❌ 发生错误: {e}")
        sys.exit(1)
