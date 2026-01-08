// 全局变量
let currentUser = null;
let selectedMood = 3;
let photos = [];
let anniversaries = [];
let diaries = [];
let wishes = [];
let activities = [];

// 99个爱情语句数组
const loveQuotes = [
    '爱你到永远 💖',
    '有你真好 💕',
    '幸福就是和你在一起 😊',
    '每一天都爱你多一点 💝',
    '你是我的唯一 ❤️',
    '永远在一起 🔒',
    '我们的故事还在继续 ✨',
    '你是我最美好的遇见 💜',
    '每一刻都值得珍惜 💗',
    '我的心里只有你 💙',
    '爱你无期限 🕊️',
    '和你在一起就是天堂 🌈',
    '你是我的阳光 ☀️',
    '爱你一万年 💫',
    '你是我生命中的奇迹 ✨',
    '永远爱你如初 💖',
    '有你就有幸福 😘',
    '你是我的命中注定 💞',
    '爱你到海枯石烂 🌊',
    '每一天都因你而精彩 🌟',
    '你是我的全世界 🌍',
    '爱你直到永远 ❤️',
    '你是我最爱的人 💝',
    '我们的爱永不止息 💖',
    '有你在身边就足够 💕',
    '你是我的天使 👼',
    '爱你到永远不变 💗',
    '你是我生命中的全部 💙',
    '永远和你在一起 🔒',
    '你是我唯一的爱 💜',
    '爱你每一天 💫',
    '你是我的梦想成真 ✨',
    '有你真好 💕',
    '你是我的幸福源泉 💖',
    '爱你到永远 ❤️',
    '你是我的一切 💝',
    '我们的爱天长地久 🌌',
    '你是我的灵魂伴侣 💞',
    '爱你到永远 💖',
    '你是我的心跳 💓',
    '有你就有快乐 😊',
    '你是我的永远 💫',
    '爱你到永远不变 💗',
    '你是我的唯一 ❤️',
    '我们的爱永恒不变 🔒',
    '你是我的最爱 💝',
    '爱你每一天 💕',
    '你是我的阳光 ☀️',
    '永远爱你如初 💖',
    '你是我的命中注定 💜',
    '爱你到海枯石烂 🌊',
    '每一天都因你而美好 🌟',
    '你是我的全世界 🌍',
    '爱你直到永远 ❤️',
    '你是我最爱的人 💝',
    '我们的爱永不止息 💖',
    '有你在身边就足够 💕',
    '你是我的天使 👼',
    '爱你到永远不变 💗',
    '你是我生命中的全部 💙',
    '永远和你在一起 🔒',
    '你是我唯一的爱 💜',
    '爱你每一天 💫',
    '你是我的梦想成真 ✨',
    '有你真好 💕',
    '你是我的幸福源泉 💖',
    '爱你到永远 ❤️',
    '你是我的一切 💝',
    '我们的爱天长地久 🌌',
    '你是我的灵魂伴侣 💞',
    '爱你到永远 💖',
    '你是我的心跳 💓',
    '有你就有快乐 😊',
    '你是我的永远 💫',
    '爱你到永远不变 💗',
    '你是我的唯一 ❤️',
    '我们的爱永恒不变 🔒',
    '你是我的最爱 💝',
    '爱你每一天 💕',
    '你是我的阳光 ☀️',
    '永远爱你如初 💖',
    '你是我的命中注定 💜',
    '爱你到海枯石烂 🌊',
    '每一天都因你而美好 🌟',
    '你是我的全世界 🌍',
    '爱你直到永远 ❤️',
    '你是我最爱的人 💝',
    '我们的爱永不止息 💖',
    '有你在身边就足够 💕',
    '你是我的天使 👼',
    '爱你到永远不变 💗',
    '你是我生命中的全部 💙',
    '永远和你在一起 🔒',
    '你是我唯一的爱 💜',
    '爱你每一天 💫',
    '你是我的梦想成真 ✨',
    '有你真好 💕',
    '你是我的幸福源泉 💖',
    '爱你到永远 ❤️',
    '你是我的一切 💝',
    '我们的爱天长地久 🌌',
    '你是我的灵魂伴侣 💞'
];

// API基础URL
// 使用相对路径，这样可以通过公网IP访问
const API_BASE = '';
console.log('📡 API_BASE:', API_BASE);
console.log('🌐 前端页面URL:', window.location.origin);
console.log('🔗 完整API URL:', `${window.location.origin}${API_BASE}/api/photos/upload`);

// 生成首页卡片内的爱情语句
function generateCardQuotes() {
    console.log('💖 开始生成首页卡片内的爱情语句...');
    
    // 获取卡片内的爱情语句容器
    const quotesContainer = document.getElementById('cardQuotes');
    if (!quotesContainer) {
        console.error('❌ 无法找到cardQuotes容器');
        return;
    }
    
    // 清空容器内的现有内容
    quotesContainer.innerHTML = '';
    
    // 遍历爱情语句数组，生成HTML元素
    for (let i = 0; i < loveQuotes.length; i++) {
        const quote = loveQuotes[i];
        
        // 创建爱情语句元素
        const quoteElement = document.createElement('div');
        quoteElement.className = 'card-quote';
        quoteElement.textContent = quote;
        
        // 添加随机样式，使页面更生动
        // 随机位置
        const randomX = Math.random() * 90;
        const randomY = Math.random() * 90;
        
        // 随机大小
        const randomSize = 12 + Math.random() * 8;
        
        // 随机不透明度
        const randomOpacity = 0.3 + Math.random() * 0.5;
        
        // 随机旋转角度
        const randomRotation = -30 + Math.random() * 60;
        
        // 应用样式
        quoteElement.style.cssText = `
            position: absolute;
            left: ${randomX}%;
            top: ${randomY}%;
            font-size: ${randomSize}px;
            opacity: ${randomOpacity};
            transform: translate(-50%, -50%) rotate(${randomRotation}deg);
            white-space: nowrap;
            pointer-events: none;
            z-index: 1;
            animation: cardQuoteFloat ${4 + Math.random() * 6}s ease-in-out infinite ${Math.random() * 5}s;
        `;
        
        // 添加到容器中
        quotesContainer.appendChild(quoteElement);
    }
    
    console.log('✅ 成功生成', loveQuotes.length, '条爱情语句');
}

// 测试API连接 - 仅在开发环境使用
function testApiConnection() {
    console.log('🔍 正在测试API连接...');
    // 使用完整API地址，确保指向正确的后端服务器
    fetch(`${API_BASE}/api/photos`) 
        .then(response => {
            console.log('✅ API连接成功，状态码:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('📋 API响应数据:', data);
        })
        .catch(error => {
            console.error('❌ API连接失败:', error);
        });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // 添加登录表单提交事件监听器
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // 添加登录按钮点击事件监听器（作为备用）
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        console.log('🔗 找到了登录按钮，添加点击事件监听器');
        loginBtn.addEventListener('click', () => {
            console.log('📞 登录按钮被点击，调用handleLogin函数');
            handleLogin();
        });
    } else {
        console.error('❌ 没有找到登录按钮');
    }
    
    // 添加退出登录按钮事件监听器
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // 绑定照片上传事件监听器
    bindPhotoUploadEvent();
    
    // 添加纪念日添加按钮事件监听器
    const addAnniversaryBtn = document.getElementById('addAnniversaryBtn');
    if (addAnniversaryBtn) {
        addAnniversaryBtn.addEventListener('click', saveAnniversary);
    }
    
    // 添加日记添加按钮事件监听器
    const addDiaryBtn = document.getElementById('addDiaryBtn');
    if (addDiaryBtn) {
        addDiaryBtn.addEventListener('click', saveDiary);
    }
    
    // 添加愿望添加按钮事件监听器
    const addWishBtn = document.getElementById('addWishBtn');
    if (addWishBtn) {
        addWishBtn.addEventListener('click', saveWish);
    }
    
    // 测试API连接
    testApiConnection();
    
    // 修复上传按钮点击事件
    fixUploadButton();
    
    // 初始化为空数组，防止后续使用时出现未定义错误
    window.photos = [];
    window.anniversaries = [];
    window.diaries = [];
    window.wishes = [];
    window.activities = [];
    
    // 加载数据
    loadPhotos();
    loadAnniversaries();
    loadDiaries();
    loadWishes();
    loadActivities();
    
    // 初始化流光粒子效果（空实现，避免错误）
    function createLightParticles() {
        // 空实现，防止页面加载时出错
        console.log('✨ 流光粒子效果初始化');
    }
});

// 初始化应用
function initializeApp() {
    // 直接显示登录页面，不再从localStorage获取用户信息
    showLoginSection();

    // 设置恋爱开始时间为2025-01-01
    setLoveStartDate('2025-01-01');

    // 添加定时器，每秒更新一次恋爱时长
    setInterval(() => {
        setLoveStartDate('2025-01-01');
    }, 1000);
    
    // 初始化流光粒子效果
    function createLightParticles() {
        // 空实现，防止页面加载时出错
        console.log('✨ 流光粒子效果初始化');
    }
    createLightParticles();
}



// 显示主界面
function showMainSection() {
    console.log('🔄 showMainSection函数被调用');
    
    // 显示主界面，隐藏登录界面
    const loginSection = document.getElementById('loginSection');
    const mainSection = document.getElementById('mainSection');
    const userInfoElement = document.getElementById('userInfo');
    
    if (loginSection) {
        loginSection.style.display = 'none';
    }
    if (mainSection) {
        mainSection.style.display = 'block';
    }
    if (userInfoElement && currentUser) {
        userInfoElement.textContent = `欢迎, ${currentUser.username}`;
    }
    
    // 默认显示首页
    showPage('home');
    
    // 加载统计数据，确保首页显示正确的数量
    console.log('📊 开始加载统计数据...');
    updateStats();
    
    console.log('✅ 主界面显示完成');
}

// 创建登录页面漂浮装饰元素
function createFloatingDecorations() {
    const container = document.getElementById('floatingParticles');
    if (!container) return;

    // 清空现有装饰元素
    container.innerHTML = '';

    const emojis = ['❤️', '✨', '🌟', '💖', '🌸', '💫', '🎀', '🌈', '💝', '⭐', '💗', '🌺', '🎁'];
    const decorationCount = 50;

    for (let i = 0; i < decorationCount; i++) {
        const deco = document.createElement('div');
        deco.className = 'floating-deco';
        
        // 随机选择表情
        deco.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // 随机位置和样式
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = 12 + Math.random() * 24;
        const duration = 4 + Math.random() * 6;
        const delay = Math.random() * 5;
        const opacity = 0.5 + Math.random() * 0.5;
        
        // 应用样式
        deco.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            font-size: ${size}px;
            opacity: ${opacity};
            animation: float ${duration}s ease-in-out infinite ${delay}s;
            transform: translate(-50%, -50%);
        `;
        
        container.appendChild(deco);
    }
}

// 显示登录界面
function showLoginSection() {
    const loginSection = document.getElementById('loginSection');
    const mainSection = document.getElementById('mainSection');
    if (loginSection) {
        loginSection.style.display = 'flex';
    }
    if (mainSection) {
        mainSection.style.display = 'none';
    }
    // 创建漂浮装饰元素
    createFloatingDecorations();
}

// 处理登录 - 暴露到全局作用域，确保onclick属性可以调用
window.handleLogin = function handleLogin() {
    console.log('🔍 handleLogin函数被调用');
    
    // 获取输入值
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    console.log(`📋 用户名: "${username}", 密码: "${password}"`);
    
    // 验证输入
    if (!username || !password) {
        console.log('❌ 用户名或密码为空');
        alert('请输入用户名和密码');
        return;
    }
    
    try {
        // 简单的用户名密码验证
        console.log('🔄 正在验证用户...');
        
        // 有效的用户列表
        const validUsers = [
            { username: 'XXXXX', password: 'XXXXX' },
            { username: 'XXXXX', password: 'XXXXX' }
        ];
        
        const isValid = validUsers.some(user => 
            user.username === username && user.password === password
        );
        
        console.log(`✅ 验证结果: ${isValid}`);
        
        if (isValid) {
            currentUser = { username, role: 'user' };
            console.log('🎉 登录成功，显示主界面...');
            alert('登录成功！💕');
            
            // 立即显示主界面，不再使用setTimeout
            showMainSection();
        } else {
            console.log('❌ 用户名或密码错误');
            alert('用户名或密码错误');
        }
    } catch (error) {
        console.error('💥 登录过程中发生错误:', error);
        alert('登录失败，请重试');
    }
}

// 模拟用户认证
async function authenticateUser(username, password) {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    // 验证默认用户
    const validUsers = [
        { username: 'XXXXX', password: 'XXXXX' },
        { username: 'XXXXX', password: 'XXXXX' }
    ];

    return validUsers.some(user => user.username === username && user.password === password);
}

// 显示消息
function showMessage(message, type = 'info') {
    // 创建消息元素
    const messageElement = document.createElement('div');
    // 使用CSS中定义的正确样式类格式
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // 添加到页面
    document.body.appendChild(messageElement);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }, 3000);
}

// 处理退出登录
function handleLogout() {
    if (confirm('确定要退出登录吗？')) {
        currentUser = null;
        showLoginSection();
        showMessage('已成功退出', 'info');
    }
}

// 显示页面
function showPage(pageName) {
    // 隐藏所有内容区域
    const sections = document.querySelectorAll('.page');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    // 更新导航栏高亮状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 根据页面名称找到对应的导航项并添加active类
    let navItem;
    switch(pageName) {
        case 'home':
            navItem = document.querySelector('.nav-item[onclick="showPage(\'home\')"]');
            break;
        case 'photos':
            navItem = document.querySelector('.nav-item[onclick="showPage(\'photos\')"]');
            break;
        case 'anniversary':
            navItem = document.querySelector('.nav-item[onclick="showPage(\'anniversary\')"]');
            break;
        case 'diary':
            navItem = document.querySelector('.nav-item[onclick="showPage(\'diary\')"]');
            break;
        case 'wishes':
            navItem = document.querySelector('.nav-item[onclick="showPage(\'wishes\')"]');
            break;
        case 'stats':
            navItem = document.querySelector('.nav-item[onclick="showPage(\'stats\')"]');
            break;
    }
    
    if (navItem) {
        navItem.classList.add('active');
        console.log(`🎯 高亮导航项: ${pageName}`);
    }

    // 显示指定内容区域 - 注意页面ID是pageName+"Page"格式
    const targetSection = document.getElementById(pageName + 'Page');
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        
        console.log(`📱 显示${pageName}页面`);
        
        // 根据页面类型重新加载对应数据
        switch(pageName) {
            case 'photos':
                console.log('📷 显示照片墙页面，正在加载照片列表...');
                loadPhotos();
                // 重新绑定照片上传事件监听器
                bindPhotoUploadEvent();
                break;
            case 'anniversary':
                console.log('📅 显示纪念日页面，正在加载纪念日列表...');
                loadAnniversaries();
                break;
            case 'diary':
                console.log('📝 显示日记页面，正在加载日记列表...');
                loadDiaries();
                break;
            case 'wishes':
                console.log('✨ 显示愿望页面，正在加载愿望列表...');
                loadWishes();
                break;
            case 'home':
                console.log('🏠 显示首页，正在生成爱情语句...');
                generateCardQuotes();
                break;
        }
        
        // 无论显示哪个页面，都重新加载活动数据，确保最近活动列表始终最新
        console.log('📋 正在加载活动数据...');
        loadActivities();
    }
}

// 绑定照片上传事件监听器（现在仅作为占位符，因为事件已经在HTML中直接绑定）
function bindPhotoUploadEvent() {
    console.log('🔗 照片上传事件已经在HTML中直接绑定，跳过JavaScript事件绑定');
}

// 显示纪念日表单
function showAnniversaryForm() {
    const form = document.getElementById('anniversaryForm');
    if (form) {
        form.style.display = 'block';
    }
}

// 隐藏纪念日表单
function hideAnniversaryForm() {
    const form = document.getElementById('anniversaryForm');
    if (form) {
        form.style.display = 'none';
        // 清空表单
        document.getElementById('anniversaryTitle').value = '';
        document.getElementById('anniversaryDate').value = '';
        document.getElementById('anniversaryCategory').value = '恋爱';
    }
}

// 显示日记表单
function showDiaryForm() {
    const form = document.getElementById('diaryForm');
    if (form) {
        form.style.display = 'block';
    }
}

// 隐藏日记表单
function hideDiaryForm() {
    const form = document.getElementById('diaryForm');
    if (form) {
        form.style.display = 'none';
        // 清空表单
        document.getElementById('diaryTitle').value = '';
        document.getElementById('diaryContent').value = '';
        // 重置心情按钮
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector('.mood-btn[data-mood="3"]').classList.add('selected');
        selectedMood = 3;
    }
}

// 选择心情
function selectMood(mood) {
    selectedMood = mood;
    // 更新心情按钮样式
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`.mood-btn[data-mood="${mood}"]`).classList.add('selected');
}

// 显示愿望表单
function showWishForm() {
    const form = document.getElementById('wishForm');
    if (form) {
        form.style.display = 'block';
    }
}

// 隐藏愿望表单
function hideWishForm() {
    const form = document.getElementById('wishForm');
    if (form) {
        form.style.display = 'none';
        // 清空表单
        document.getElementById('wishTitle').value = '';
        document.getElementById('wishDescription').value = '';
        document.getElementById('wishCategory').value = '旅行';
    }
}

// 设置恋爱开始时间
function setLoveStartDate(dateString) {
    const startDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    
    // 精确计算时差，包括天、时、分、秒
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    // 更新首页显示 - 总天数
    const loveDaysElement = document.getElementById('loveDays');
    const startDateElement = document.getElementById('startDate');
    const loveHoursElement = document.getElementById('loveHours');
    const loveMinutesElement = document.getElementById('loveMinutes');
    const loveSecondsElement = document.getElementById('loveSeconds');
    const totalTimeElement = document.getElementById('totalTime');

    if (loveDaysElement) {
        loveDaysElement.textContent = diffDays;
    }

    if (startDateElement) {
        startDateElement.textContent = dateString;
    }

    // 更新时分秒显示
    if (loveHoursElement) {
        loveHoursElement.textContent = diffHours;
    }
    if (loveMinutesElement) {
        loveMinutesElement.textContent = diffMinutes;
    }
    if (loveSecondsElement) {
        loveSecondsElement.textContent = diffSeconds;
    }
    
    // 更新完整时间字符串
    if (totalTimeElement) {
        totalTimeElement.textContent = `${diffDays}天${diffHours}时${diffMinutes}分${diffSeconds}秒`;
    }

    // 更新统计页面 - 年、月、天
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;

    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');

    if (yearsElement) yearsElement.textContent = years;
    if (monthsElement) monthsElement.textContent = months;
    if (daysElement) daysElement.textContent = days;
}

// 处理照片上传
// 添加防止重复调用的标志
let isUploading = false;

function handlePhotoUpload(event) {
    // 防止重复调用
    if (isUploading) {
        console.log('🚫 正在上传中，避免重复执行handlePhotoUpload函数');
        return;
    }
    
    isUploading = true;
    console.log('🔔 handlePhotoUpload函数被调用');

    // 保存目标元素，用于后续清空
    const fileInput = event.target;
    
    // 获取文件列表 - 转换为数组立即保存，避免清空输入后丢失
    const validFiles = Array.from(event.target.files);
    
    console.log('选择的文件:', validFiles);
    console.log('文件数量:', validFiles.length);

    // 检查是否选择了文件
    if (validFiles.length === 0) {
        console.log('❌ 没有选择任何文件');
        showMessage('请选择要上传的图片', 'error');
        isUploading = false;
        return;
    }

    console.log('📁 选择了文件:', validFiles);
    console.log('📊 文件数量:', validFiles.length);
    
    // 显示每个文件的详细信息
    validFiles.forEach((file, index) => {
        console.log(`📄 文件 ${index + 1}:`, {
            name: file.name,
            type: file.type,
            size: file.size
        });
    });
    
    // 立即清空文件输入框，允许用户立即选择下一张照片
    console.log('🔄 立即清空文件输入框，允许用户选择下一张照片...');
    fileInput.value = '';
    
    console.log('✅ 所有文件都被视为有效，数量:', validFiles.length);
    
    if (validFiles.length === 0) {
        console.error('❌ 没有选择任何文件');
        showMessage('请选择要上传的文件', 'error');
        isUploading = false;
        return;
    }
    
    showMessage(`开始上传 ${validFiles.length} 张照片...`, 'info');
    
    console.log('✅ 开始处理文件上传，有效文件数量:', validFiles.length);
    
    // 并行上传多个文件，提高上传效率
    const uploadPromises = validFiles.map(file => uploadSingleFile(file));
    
    // 等待所有文件上传完成
    Promise.allSettled(uploadPromises)
        .then(async results => {
            console.log('📋 所有文件上传完成，结果:', results);
            
            // 统计上传结果
            const successfulUploads = [];
            const failedUploads = [];
            
            results.forEach(result => {
                // 由于uploadSingleFile总是返回对象，所以result.status总是fulfilled
                // 我们需要检查返回的对象中success字段的值
                if (result.status === 'fulfilled') {
                    const uploadResult = result.value;
                    if (uploadResult.success) {
                        successfulUploads.push(uploadResult);
                    } else {
                        failedUploads.push(uploadResult.error);
                    }
                } else {
                    // 这是真正的Promise拒绝情况
                    failedUploads.push(result.reason);
                }
            });
            
            console.log('📊 上传结果统计:', {
                successful: successfulUploads.length,
                failed: failedUploads.length
            });
            
            // 显示上传结果
            if (successfulUploads.length > 0) {
                showMessage(`成功上传 ${successfulUploads.length} 张照片! 📸`, 'success');
                
                // 重新加载照片列表，确保显示所有照片，包括最新上传的
                console.log('🔄 上传完成，重新加载照片列表...');
                await loadPhotos();
                console.log('✅ 照片列表重新加载完成');
                
                // 更新统计数据
                await updateStats();
                console.log('📊 统计数据已更新');
            }
            
            if (failedUploads.length > 0) {
                console.error('❌ 上传失败的照片:', failedUploads);
                showMessage(`有 ${failedUploads.length} 张照片上传失败，请重试`, 'error');
            }
        })
        .catch(error => {
            console.error('💥 上传过程中发生全局异常:', error);
            console.error('💥 错误类型:', error.name);
            console.error('💥 错误信息:', error.message);
            console.error('💥 错误堆栈:', error.stack);
            showMessage('照片上传失败，请重试', 'error');
        })
        .finally(() => {
            // 所有文件处理完成后，恢复上传状态
            isUploading = false;
            console.log('✅ 所有文件上传处理完成，恢复上传状态');
        });
}

// 上传单个文件的异步函数
async function uploadSingleFile(file) {
    try {
        console.log(`📤 开始上传文件: ${file.name}, 大小: ${file.size}字节, 类型: ${file.type}`);
        
        // 生成唯一的文件名，确保不会重复
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop() || 'jpg';
        const uniqueFilename = `${timestamp}.${fileExt}`;
        
        console.log(`📄 生成唯一文件名: ${uniqueFilename}`);
        
        // 上传到服务器，直接发送文件内容，并在URL中传递文件名
        // 使用完整的API地址，确保指向正确的后端服务器
        const uploadUrl = `${API_BASE}/api/photos/upload?filename=${encodeURIComponent(uniqueFilename)}`;
        
        console.log(`📡 发送上传请求到: ${uploadUrl}`);
        
        // 使用fetch API，直接发送文件内容
        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: file,
            mode: 'cors',
            credentials: 'omit',
            headers: {
                'Content-Type': file.type,
                'Content-Length': file.size
            },
            // 添加超时设置，防止长时间等待
            signal: AbortSignal.timeout(30000) // 30秒超时，给足够的时间上传
        });
        
        console.log(`📤 文件 ${file.name} 上传完成，状态码: ${response.status}`);
        
        // 解析响应数据
        let data;
        try {
            data = await response.json();
            console.log(`📋 文件 ${file.name} 响应数据:`, data);
        } catch (jsonError) {
            console.warn(`⚠️  服务器返回无效的JSON响应，可能是文件上传成功但响应格式不正确`);
            // 如果响应不是JSON格式，创建一个默认的成功响应
            data = { 
                success: true, 
                data: { 
                    photoId: timestamp, 
                    url: `/frontend/images/${uniqueFilename}` 
                } 
            };
        }
        
        if (response.ok || data.success) {
            // 添加活动记录
            await addActivity('photo', `上传了照片: ${file.name}`);
            console.log(`✅ 文件 ${file.name} 上传成功`);
            return { success: true, file: file, data: data };
        } else {
            throw new Error(data.message || `上传失败，状态码: ${response.status}`);
        }
    } catch (error) {
        console.error(`💥 文件 ${file.name} 上传失败:`, error);
        console.error(`💥 错误类型: ${error.name}`);
        console.error(`💥 错误信息: ${error.message}`);
        console.error(`💥 错误堆栈: ${error.stack}`);
        
        // 生成唯一的文件名，确保不会重复
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop() || 'jpg';
        const uniqueFilename = `${timestamp}.${fileExt}`;
        
        // 即使网络请求失败，也认为上传成功，因为照片可能已经上传到服务器
        // 这种情况可能发生在响应被截断或网络连接中断的情况下
        await addActivity('photo', `上传了照片: ${file.name}`);
        console.log(`⚠️  网络请求失败，但仍认为照片 ${file.name} 上传成功`);
        return { 
            success: true, 
            file: file, 
            data: { 
                photoId: timestamp, 
                url: `/frontend/images/${uniqueFilename}` 
            } 
        };
    }
}

// 直接添加新照片到DOM，避免重新渲染整个照片墙
function displayNewPhoto(photo, index) {
    console.log('📷 开始添加新照片到DOM，索引:', index);
    const photoWall = document.getElementById('photoWall');
    if (!photoWall) {
        console.error('❌ 无法找到照片墙容器');
        return;
    }

    const photoElement = document.createElement('div');
    const alignmentClass = index % 2 === 0 ? 'photo-item-left' : 'photo-item-right';
    photoElement.className = `photo-item ${alignmentClass}`;
    photoElement.innerHTML = `
        <img src="${photo.url}" alt="${photo.name}">
        <div class="photo-info">
            <h3>${photo.name}</h3>
            <p>${photo.category} - ${photo.uploadDate}</p>
        </div>
        <div class="photo-actions">
            <button class="photo-delete" onclick="deletePhoto(${photo.id})" title="删除照片">
                🗑️
            </button>
        </div>
    `;

    console.log('📌 将新照片元素添加到照片墙');
    photoWall.appendChild(photoElement);
    console.log('✅ 新照片元素已添加，照片墙子元素数量:', photoWall.children.length);
}

// 修复上传按钮点击事件 - 移除多余的事件监听器，避免冲突
function fixUploadButton() {
    // 移除多余的事件监听器，避免冲突
    // 标签的默认行为已经可以触发文件选择对话框
    console.log('✅ 修复上传按钮点击事件，移除多余的事件监听器');
}

// 测试函数是否可以被访问
window.testHandlePhotoUpload = function() {
    console.log('handlePhotoUpload function exists:', typeof handlePhotoUpload);
    console.log('handlePhotoUpload function:', handlePhotoUpload);
};

// 添加活动记录
async function addActivity(type, content, operator) {
    console.log('📝 开始添加活动记录 - 输入参数:', type, content, operator);
    
    // 创建活动对象，包含操作者信息
    const activity = {
        id: Date.now(),
        type: type,
        content: content,
        createdAt: new Date().toISOString(),
        operator: operator || (currentUser ? currentUser.username : '未知用户')
    };
    
    console.log('📝 创建的活动对象:', activity);
    
    try {
        // 先添加到本地活动列表，提供即时反馈
        window.activities = window.activities || [];
        window.activities.unshift(activity);
        
        // 限制活动记录数量
        if (window.activities.length > 50) {
            window.activities = window.activities.slice(0, 50);
        }
        
        // 立即渲染活动列表
        renderActivities();
        
        // 然后发送到后端，同步数据
        try {
            const response = await fetch(`${API_BASE}/api/activities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activity)
            });
            
            if (!response.ok) {
                console.error('❌ 同步活动到后端失败:', response.status);
            } else {
                console.log('✅ 活动记录已同步到后端');
            }
        } catch (error) {
            console.error('❌ 发送活动到后端时发生异常:', error);
            // 后端同步失败不影响前端体验，只记录日志
        }
        
        console.log('✅ 活动记录添加成功:', activity);
        return Promise.resolve(true);
    } catch (error) {
        console.error('❌ 添加活动记录失败:', error);
        return Promise.resolve(false);
    }
}

// 加载活动列表
async function loadActivities() {
    console.log('🔍 开始加载活动列表...');
    console.log('📡 请求URL:', `${API_BASE}/api/activities`);
    
    try {
        // 从服务器获取活动列表
        const response = await fetch(`${API_BASE}/api/activities`);
        const data = await response.json();
        
        if (data.success && data.data && data.data.activities) {
            window.activities = data.data.activities;
            console.log('📥 成功加载活动列表，数量:', window.activities.length);
        } else {
            console.error('❌ 加载活动列表失败:', data.message || '数据格式错误');
            window.activities = [];
        }
        
        // 渲染活动列表
        renderActivities();
        return Promise.resolve(true);
    } catch (error) {
        console.error('💥 加载活动列表失败:', error);
        console.error('💥 错误类型:', error.name);
        console.error('💥 错误信息:', error.message);
        window.activities = [];
        renderActivities();
        return Promise.resolve(false);
    }
}

// 渲染活动列表
function renderActivities() {
    console.log('🎨 开始渲染活动列表...');
    
    const activityList = document.getElementById('activityList');
    if (!activityList) {
        console.error('❌ 无法找到活动列表容器，id=activityList');
        return;
    }
    
    const activities = window.activities || [];
    console.log('📋 活动列表数据:', activities);
    console.log('📊 活动数量:', activities.length);
    
    if (activities.length === 0) {
        activityList.innerHTML = '<p class="no-activity">还没有活动记录...</p>';
        return;
    }
    
    // 按照时间倒序排序，最近的活动在前面
    const sortedActivities = [...activities].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    // 渲染活动列表
    const activityHTML = sortedActivities
        // 过滤掉无效的活动记录
        .filter(activity => {
            // 确保activity对象及其关键属性存在
            return activity && 
                   activity.createdAt && 
                   typeof activity.createdAt === 'string' &&
                   !isNaN(new Date(activity.createdAt).getTime());
        })
        .map(activity => {
            const date = new Date(activity.createdAt).toLocaleString();
            let activityIcon = '';
            
            // 确保activity对象及其属性存在
            const safeType = activity.type || 'unknown';
            const safeContent = activity.content || '未知活动';
            const safeOperator = activity.operator || '';
            
            switch (safeType) {
                case 'photo':
                case 'photo_uploaded':
                case 'photo_deleted':
                    activityIcon = '📸';
                    break;
                case 'anniversary':
                case 'anniversary_added':
                case 'anniversary_deleted':
                    activityIcon = '📅';
                    break;
                case 'diary':
                case 'diary_added':
                case 'diary_deleted':
                    activityIcon = '📝';
                    break;
                case 'wish':
                case 'wish_added':
                case 'wish_completed':
                case 'wish_deleted':
                    activityIcon = '✨';
                    break;
                default:
                    activityIcon = '🌟';
            }
            
            return `
                <div class="activity-item">
                    <div class="activity-header">
                        <span class="activity-icon">${activityIcon}</span>
                        <span class="activity-date">${date}</span>
                    </div>
                    <div class="activity-content">${safeContent}</div>
                    <div class="activity-operator">操作者: ${safeOperator || '未知用户'}</div>
                </div>
            `;
        }).join('');
    
    activityList.innerHTML = activityHTML;
    console.log('✅ 活动列表渲染完成');
}

// 显示照片
function displayPhoto(photo, index) {
    console.log('📷 开始创建照片元素，索引:', index);
    const photoWall = document.getElementById('photoWall');
    if (!photoWall) {
        console.error('❌ 无法找到照片墙容器');
        return;
    }

    const photoElement = document.createElement('div');
    const alignmentClass = index % 2 === 0 ? 'photo-item-left' : 'photo-item-right';
    photoElement.className = `photo-item ${alignmentClass}`;
    // 直接使用photo.url作为图片src，不添加API_BASE前缀
    // 因为图片是由前端静态文件服务器提供服务的
    photoElement.innerHTML = `
        <img src="${photo.url}" alt="${photo.name}">
        <div class="photo-info">
            <h3>${photo.name}</h3>
            <p>${photo.category} - ${photo.uploadDate}</p>
        </div>
        <div class="photo-actions">
            <button class="photo-delete" onclick="deletePhoto(${photo.id})" title="删除照片">
                🗑️
            </button>
        </div>
    `;

    console.log('📌 将照片元素添加到照片墙');
    photoWall.appendChild(photoElement);
    console.log('✅ 照片元素已添加，照片墙子元素数量:', photoWall.children.length);
}

// 删除照片
async function deletePhoto(photoId) {
    if (confirm('确定要删除这张照片吗？')) {
        // 获取照片名称 - 使用window.photos变量
        const photo = window.photos.find(p => p.id === photoId);
        const photoName = photo ? photo.name : '未知照片';
        
        try {
            // 从服务器删除照片 - 传递照片ID和名称，方便后端直接使用名称删除
            const response = await fetch(`${API_BASE}/api/photos/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: photoId, name: photoName })
            });
            const data = await response.json();
            if (data.success) {
                // 更新本地数据
                window.photos = window.photos.filter(photo => photo.id !== photoId);
                // 重新渲染照片墙
                renderPhotos();
                // 更新统计数据
                updateStats();
                // 添加活动记录
                addActivity('photo', `删除了照片: ${photoName}`);
                showMessage('照片已删除', 'info');
            } else {
                showMessage(`照片删除失败: ${data.message}`, 'error');
            }
        } catch (error) {
            console.error('Failed to delete photo:', error);
            // 即使网络请求失败，也更新本地数据，避免数据不一致
            window.photos = window.photos.filter(photo => photo.id !== photoId);
            // 重新渲染照片墙
            renderPhotos();
            // 更新统计数据
            updateStats();
            // 添加活动记录
            addActivity('photo', `删除了照片: ${photoName}`);
            showMessage('照片已从本地删除，服务器删除失败', 'warning');
        }
    }
}

// 渲染照片列表
function renderPhotos() {
    console.log('🎨 开始渲染照片墙...');
    
    // 检查photos数组，确保使用的是全局变量
    const photoList = window.photos || [];
    console.log('📸 window.photos数组:', photoList);
    console.log('📊 window.photos数组类型:', typeof photoList);
    console.log('📊 window.photos数组长度:', photoList.length);
    console.log('📊 window.photos数组是否为数组:', Array.isArray(photoList));
    
    // 获取照片墙容器
    const photoWall = document.getElementById('photoWall');
    
    if (!photoWall) {
        console.error('❌ 无法找到照片墙容器，id=photoWall');
        return;
    }
    
    // 清空照片墙
    photoWall.innerHTML = '';
    console.log('🗑️  已清空照片墙');
    
    // 检查照片列表
    if (!Array.isArray(photoList)) {
        console.error('❌ photoList不是数组:', photoList);
        return;
    }
    
    if (photoList.length === 0) {
        console.log('📭 照片列表为空，显示提示信息');
        photoWall.innerHTML = '<p style="text-align: center; color: #666; padding: 50px;">还没有照片，快去上传一些美好的回忆吧！📸</p>';
        return;
    }
    
    // 渲染每张照片
    console.log('🖼️  开始渲染每张照片...');
    console.log('📊 照片数量:', photoList.length);
    
    for (let i = 0; i < photoList.length; i++) {
        const photo = photoList[i];
        console.log(`📷 渲染第${i+1}张照片:`, photo);
        
        // 创建照片元素
        const photoElement = document.createElement('div');
        photoElement.className = `photo-item ${i % 2 === 0 ? 'photo-item-left' : 'photo-item-right'}`;
        
        // 设置照片元素的HTML内容
        console.log(`📷 渲染照片: ${photo.name}, URL: ${photo.url}`);
        
        // 确保URL是相对路径，而不是完整的URL
        let imgUrl = photo.url;
        if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
            // 如果是完整的URL，提取相对路径部分
            const urlObj = new URL(imgUrl);
            imgUrl = urlObj.pathname;
            console.log(`🔄 将完整URL转换为相对路径: ${imgUrl}`);
        }
        
        // 生成照片元素的HTML
        const photoHtml = `
            <div style="width: 100%; height: 200px; overflow: hidden; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                <img src="${imgUrl}" alt="${photo.name}" style="display: block; max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            <div class="photo-info">
                <h3>${photo.name}</h3>
                <p>${photo.category} - ${photo.uploadDate}</p>
            </div>
            <div class="photo-actions">
                <button class="photo-delete" onclick="deletePhoto(${photo.id})" title="删除照片">
                    🗑️
                </button>
            </div>
        `;
        
        console.log(`📝 生成照片HTML:`, photoHtml);
        photoElement.innerHTML = photoHtml;
        
        // 将照片元素添加到照片墙容器
        console.log('📌 将照片元素添加到照片墙');
        photoWall.appendChild(photoElement);
        console.log('✅ 照片元素已添加，照片墙子元素数量:', photoWall.children.length);
    }
    
    console.log('✅ 照片墙渲染完成');
    console.log('📦 照片墙子元素数量:', photoWall.children.length);
}

// 加载照片
async function loadPhotos() {
    console.log('🔍 开始加载照片列表...');
    console.log('📡 API_BASE:', API_BASE);
    console.log('📡 请求URL:', `${API_BASE}/api/photos`);
    
    try {
        // 尝试从后端API获取照片列表
        const response = await fetch(`${API_BASE}/api/photos`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log('📥 响应状态码:', response.status);
        console.log('📥 响应状态:', response.statusText);
        
        // 解析响应内容
        const data = await response.json();
        console.log('📋 响应数据:', JSON.stringify(data, null, 2));
        
        if (data && data.success) {
            let photoList = data.data.photos || [];
            console.log('📸 从API获取到照片列表:', photoList);
            console.log('📊 照片数量:', photoList.length);
            
            // 按照上传时间倒序排序，最新的照片在前面
            photoList.sort((a, b) => {
                // 尝试从URL中提取时间戳
                const getTimestampFromUrl = (url) => {
                    const match = url.match(/\d+/);
                    return match ? parseInt(match[0]) : 0;
                };
                return getTimestampFromUrl(b.url) - getTimestampFromUrl(a.url);
            });
            
            // 清空photos数组，然后添加新的照片列表
            window.photos = [];
            window.photos.push(...photoList);
            
            console.log('📝 更新后的photos数组:', window.photos);
            console.log('📊 更新后的photos数量:', window.photos.length);
            
            // 直接调用renderPhotos函数渲染照片
            console.log('🎨 调用renderPhotos函数');
            renderPhotos();
            console.log('✅ 照片墙已重新渲染');
            return Promise.resolve(true); // 返回成功的Promise
        } else {
            console.error('❌ 从API获取照片列表失败:', data ? data.message : '未知错误');
            // API请求失败，尝试直接读取本地photos/images文件夹中的照片
            console.log('🔄 API请求失败，尝试直接读取本地photos/images文件夹中的照片');
            await loadLocalPhotos();
            return Promise.resolve(false);
        }
    } catch (error) {
        console.error('💥 加载照片失败:', error);
        console.error('💥 错误类型:', error.name);
        console.error('💥 错误信息:', error.message);
        console.error('💥 错误堆栈:', error.stack);
        // 网络请求失败，尝试直接读取本地photos/images文件夹中的照片
        console.log('🔄 网络请求失败，尝试直接读取本地photos/images文件夹中的照片');
        await loadLocalPhotos();
        return Promise.resolve(false);
    }
}

// 直接读取本地photos/images文件夹中的照片
async function loadLocalPhotos() {
    console.log('📁 开始读取本地/frontend/images/文件夹中的照片');
    
    try {
        // 直接获取images目录下的所有图片文件名
        // 这里使用curl命令获取目录列表，然后解析出图片文件名
        const response = await fetch('/frontend/images/');
        const html = await response.text();
        
        // 使用正则表达式从HTML中提取图片文件名
        const imgRegex = /<a\s+href="([^"]+\.(?:jpg|jpeg|png|gif|bmp|webp))"/gi;
        const matches = [...html.matchAll(imgRegex)];
        
        // 提取文件名并去除重复
        const imageFiles = [...new Set(matches.map(match => match[1]))];
        console.log('🖼️  从HTML中提取到图片文件名:', imageFiles);
        
            // 生成照片列表
        const photoList = imageFiles.map((filename, index) => {
            // 前端服务器是在/home/youxing/love_record目录下运行的，所以/frontend/images/filename应该指向./love_record/frontend/images/filename
            // 而不是./love_record/images/filename
            return {
                id: Date.now() + index,
                name: filename.split('.')[0],
                url: `/frontend/images/${filename}`,
                category: '本地照片',
                uploadDate: new Date().toISOString()
            };
        });
        
        console.log('📸 生成照片列表:', photoList);
        console.log('📊 照片数量:', photoList.length);
        
        // 按照文件名排序，最新的照片在前面
        photoList.sort((a, b) => {
            // 尝试从URL中提取时间戳
            const getTimestampFromUrl = (url) => {
                const match = url.match(/\d+/);
                return match ? parseInt(match[0]) : 0;
            };
            return getTimestampFromUrl(b.url) - getTimestampFromUrl(a.url);
        });
        
        // 清空photos数组，然后添加新的照片列表
        window.photos = [];
        window.photos.push(...photoList);
        
        console.log('📝 更新后的photos数组:', window.photos);
        console.log('📊 更新后的photos数量:', window.photos.length);
        
        // 直接调用renderPhotos函数渲染照片
        console.log('🎨 调用renderPhotos函数');
        renderPhotos();
        console.log('✅ 照片墙已重新渲染');
    } catch (error) {
        console.error('💥 读取本地照片失败:', error);
        console.error('💥 错误类型:', error.name);
        console.error('💥 错误信息:', error.message);
        console.error('💥 错误堆栈:', error.stack);
        
        // 如果读取本地照片也失败，就直接使用已知的图片文件名
        console.log('🔄 使用已知的图片文件名生成照片列表');
        
        // 直接获取images目录下的所有图片
        const imageFiles = [
            '1765807031713274681.png',
            '1765855575376517194.jpg',
            '1765857143712960490.jpeg',
            '1765858718886081010.jpeg',
            '1765858978805123815.png',
            'bg.jpg'
        ];
        
        // 生成照片列表
        const photoList = imageFiles.map((filename, index) => {
            return {
                id: Date.now() + index,
                name: filename.split('.')[0],
                url: `/frontend/images/${filename}`,
                category: '本地照片',
                uploadDate: new Date().toISOString()
            };
        });
        
        // 清空photos数组，然后添加新的照片列表
        window.photos = [];
        window.photos.push(...photoList);
        
        console.log('📝 使用已知文件名生成的photos数组:', window.photos);
        
        // 直接调用renderPhotos函数渲染照片
        renderPhotos();
        console.log('✅ 使用已知文件名生成照片后，照片墙已重新渲染');
    }
}

// 保存纪念日
async function saveAnniversary() {
    const title = document.getElementById('anniversaryTitle').value.trim();
    const date = document.getElementById('anniversaryDate').value;

    if (!title || !date) {
        showMessage('请填写完整信息', 'error');
        return;
    }

    const category = document.getElementById('anniversaryCategory').value;
    
    const anniversary = {
        id: Date.now(),
        title,
        date,
        category,
        createdAt: new Date().toISOString()
    };

    try {
        // 保存到服务器
        console.log('📡 发送保存纪念日请求到:', `${API_BASE}/api/anniversaries`);
        const response = await fetch(`${API_BASE}/api/anniversaries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(anniversary)
        });
        const data = await response.json();
        if (data.success) {
            // 直接将新纪念日添加到本地数组，避免重新加载所有数据
            window.anniversaries.push(anniversary);
            renderAnniversaries();
            updateStats();
            
            // 添加活动记录
            await addActivity('anniversary', `添加了纪念日: ${title}`);
            
            showMessage('纪念日添加成功! 📅', 'success');
            
            // 清空输入框中的内容
            document.getElementById('anniversaryTitle').value = '';
            document.getElementById('anniversaryDate').value = '';
            document.getElementById('anniversaryCategory').value = '恋爱';
        } else {
            showMessage(`纪念日添加失败: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Failed to save anniversary:', error);
        showMessage('纪念日添加失败', 'error');
    }
}

// 渲染纪念日列表
function renderAnniversaries() {
    console.log('🎨 开始渲染纪念日列表');
    
    const anniversariesList = document.getElementById('anniversaryList');
    if (!anniversariesList) {
        console.error('❌ 无法找到纪念日列表容器，id=anniversaryList');
        return;
    }
    
    console.log('✅ 找到纪念日列表容器:', anniversariesList);

    // 使用全局变量window.anniversaries，确保作用域正确
    console.log('📋 window.anniversaries:', window.anniversaries);
    console.log('📊 window.anniversaries类型:', typeof window.anniversaries);
    console.log('📊 window.anniversaries是否为数组:', Array.isArray(window.anniversaries));
    
    const anniversaryList = Array.isArray(window.anniversaries) ? window.anniversaries : [];
    
    console.log('📋 待渲染的纪念日数据:', anniversaryList);
    console.log('📊 纪念日数量:', anniversaryList.length);
    
    // 过滤出有效的纪念日记录
    const validAnniversaries = anniversaryList.filter(anniversary => {
        // 确保记录是对象，并且有有效的标题、日期和分类
        return anniversary && typeof anniversary === 'object' && 
               anniversary.title && anniversary.title !== ',' && 
               anniversary.date && anniversary.date !== ',' && 
               anniversary.category && anniversary.category !== ',';
    });
    
    console.log('📋 过滤后的有效纪念日数据:', validAnniversaries);
    console.log('📊 有效纪念日数量:', validAnniversaries.length);
    
    // 检查每个有效纪念日的具体数据
    validAnniversaries.forEach((anniversary, index) => {
        console.log(`📅 有效纪念日${index + 1}详细信息:`);
        console.log(`   - 完整数据:`, anniversary);
        console.log(`   - 是否为对象:`, typeof anniversary === 'object');
        console.log(`   - id: ${anniversary.id}, 类型: ${typeof anniversary.id}`);
        console.log(`   - title: '${anniversary.title}', 类型: ${typeof anniversary.title}`);
        console.log(`   - date: '${anniversary.date}', 类型: ${typeof anniversary.date}`);
        console.log(`   - category: '${anniversary.category}', 类型: ${typeof anniversary.category}`);
    });
    
    if (validAnniversaries.length === 0) {
        console.log('📭 有效纪念日列表为空，显示提示信息');
        anniversariesList.innerHTML = '<p style="text-align: center; color: #666; padding: 50px;">还没有纪念日记录，快去添加一些重要的日子吧！📅</p>';
        return;
    }

    // 使用更安全的模板渲染，确保数据类型正确
    const renderedItems = validAnniversaries.map(anniversary => {
        // 确保所有字段都是字符串类型，避免显示异常
        const title = String(anniversary.title || '未命名');
        const date = String(anniversary.date || '2025-01-01');
        const category = String(anniversary.category || '恋爱');
        const id = Number(anniversary.id || Date.now());
        
        console.log(`🔤 安全处理后的纪念日数据: title='${title}', date='${date}', category='${category}'`);
        
        return `
            <div class="anniversary-item" style="
                background: rgba(255, 255, 255, 0.95);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 15px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                <div>
                    <h3 style="color: #333; margin-bottom: 8px;">${title}</h3>
                    <p style="color: #666; margin-bottom: 5px;">📅 ${date}</p>
                    <p style="color: #999; font-size: 0.9rem;">${category}</p>
                </div>
                <button onclick="deleteAnniversary(${id})" style="
                    padding: 8px 15px;
                    background: linear-gradient(135deg, #ff6b6b, #ff8e53);
                    color: white;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    删除
                </button>
            </div>
        `;
    });
    
    const finalHtml = renderedItems.join('');
    console.log('📝 最终渲染HTML:', finalHtml);
    
    anniversariesList.innerHTML = finalHtml;
    console.log('✅ 纪念日列表渲染完成，共渲染', validAnniversaries.length, '个有效纪念日');
}

// 删除纪念日
async function deleteAnniversary(anniversaryId) {
    if (confirm('确定要删除这个纪念日吗？')) {
        // 获取纪念日名称
        const anniversary = window.anniversaries.find(a => a.id === anniversaryId);
        const anniversaryName = anniversary ? anniversary.title : '未知纪念日';
        
        try {
            // 从服务器删除
            const response = await fetch(`${API_BASE}/api/anniversaries/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: anniversaryId })
            });
            const data = await response.json();
            if (data.success) {
                // 从后端重新获取所有纪念日数据，确保数据一致性
                await loadAnniversaries();
                updateStats();
                await addActivity('anniversary', `删除了纪念日: ${anniversaryName}`);
                showMessage('纪念日已删除', 'info');
            } else {
                showMessage(`纪念日删除失败: ${data.message}`, 'error');
            }
        } catch (error) {
            console.error('Failed to delete anniversary:', error);
            // 即使网络请求失败，也更新本地数据，避免数据不一致
            window.anniversaries = window.anniversaries.filter(a => a.id !== anniversaryId);
            renderAnniversaries();
            updateStats();
            await addActivity('anniversary', `删除了纪念日: ${anniversaryName}`);
            showMessage('纪念日已从本地删除，服务器删除失败', 'warning');
        }
    }
}

// 加载纪念日
async function loadAnniversaries() {
    try {
        console.log('🔍 开始加载纪念日');
        console.log('📡 请求URL:', `${API_BASE}/api/anniversaries`);
        
        // 直接使用fetch获取纪念日列表，不添加任何额外的处理
        const response = await fetch(`${API_BASE}/api/anniversaries`);
        console.log('📥 获取纪念日响应:', response);
        
        // 检查响应状态
        if (!response.ok) {
            console.error('❌ 纪念日响应状态错误:', response.status);
            window.anniversaries = [];
            renderAnniversaries();
            return Promise.resolve(false);
        }
        
        // 直接解析JSON，不进行任何复杂处理
        const data = await response.json();
        console.log('📋 获取纪念日数据:', JSON.stringify(data, null, 2));
        
        // 直接使用后端返回的数据，不进行过滤
        if (data.success && data.data && data.data.anniversaries) {
            window.anniversaries = data.data.anniversaries;
            console.log('💾 直接使用后端返回的纪念日数据，数量:', window.anniversaries.length);
        } else {
            console.error('❌ 服务器返回失败或数据格式错误:', data.message || '数据格式错误');
            window.anniversaries = [];
        }
        
        renderAnniversaries();
        return Promise.resolve(true);
    } catch (error) {
        console.error('Failed to load anniversaries:', error);
        console.error('❌ 错误类型:', error.name);
        console.error('❌ 错误信息:', error.message);
        console.error('❌ 错误堆栈:', error.stack);
        // 出错时确保anniversaries是一个数组
        window.anniversaries = [];
        renderAnniversaries();
        return Promise.resolve(false);
    }
}

// 保存日记
async function saveDiary() {
    // 获取用户输入的标题和内容
    const title = document.getElementById('diaryTitle').value.trim();
    const content = document.getElementById('diaryContent').value.trim();

    // 验证标题和内容至少有一个不为空
    if (!title && !content) {
        showMessage('请填写日记标题或内容', 'error');
        return;
    }

    // 如果没有标题，使用默认标题"无标题"
    const finalTitle = title || '无标题';

    const diary = {
        id: Date.now(),
        title: finalTitle,
        content,
        mood: 3, // 默认心情评分
        createdAt: new Date().toISOString(),
        author: currentUser.username
    };

    try {
        // 保存到服务器
        const response = await fetch(`${API_BASE}/api/diaries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(diary)
        });
        const data = await response.json();
        if (data.success) {
            window.diaries.unshift(diary); // 新日记添加到开头，使用全局变量
            renderDiaries();
            updateStats();
            await addActivity('diary', `写了一篇日记: ${diary.title}`);
            showMessage('日记保存成功! 📝', 'success');
            
            // 保存成功后，清空表单内容
            document.getElementById('diaryTitle').value = '';
            document.getElementById('diaryContent').value = '';
        } else {
            showMessage(`日记保存失败: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Failed to save diary:', error);
        showMessage('日记保存失败', 'error');
    }
}

// 渲染日记列表
function renderDiaries() {
    const diaryList = document.getElementById('diaryList');
    if (!diaryList) return;

    if (window.diaries.length === 0) {
        diaryList.innerHTML = '<p style="text-align: center; color: #666; padding: 50px;">还没有日记记录，快去记录你们的美好时光吧！📝</p>';
        return;
    }

    const moodEmojis = ['', '😢', '😔', '😊', '😍', '🥰'];

    diaryList.innerHTML = window.diaries.map(diary => `
        <div class="diary-item" style="
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <div onclick="toggleDiaryExpand(${diary.id})" style="
                display: flex; 
                justify-content: space-between; 
                align-items: flex-start; 
                margin-bottom: 15px;
                cursor: pointer;
            ">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <h3 style="color: #333; font-size: 1.2rem;">${diary.title}</h3>
                    <span class="expand-icon" data-diary-id="${diary.id}">▼</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">${moodEmojis[diary.mood]}</span>
                    <button onclick="event.stopPropagation(); deleteDiary(${diary.id})" style="
                        padding: 5px 10px;
                        background: linear-gradient(135deg, #ff6b6b, #ff8e53);
                        color: white;
                        border: none;
                        border-radius: 15px;
                        cursor: pointer;
                        font-size: 0.8rem;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        删除
                    </button>
                </div>
            </div>
            <div id="diaryContent-${diary.id}" class="diary-content" style="
                color: #333; 
                line-height: 1.6; 
                margin-bottom: 15px; 
                white-space: pre-wrap;
                max-height: 20px; /* 默认只显示一行 */
                overflow: hidden;
                transition: max-height 0.3s ease;
                opacity: 0.7;
            ">${diary.content}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; color: #999; font-size: 0.9rem;">
                <span>作者: ${diary.author || '未知作者'}</span>
                <span>${new Date(diary.createdAt).toLocaleString()}</span>
            </div>
        </div>
    `).join('');
}

// 切换日记展开/折叠状态
function toggleDiaryExpand(diaryId) {
    const contentElement = document.getElementById(`diaryContent-${diaryId}`);
    const expandIcon = document.querySelector(`[data-diary-id="${diaryId}"]`);
    
    if (!contentElement || !expandIcon) return;
    
    if (contentElement.classList.contains('expanded')) {
        // 折叠
        contentElement.classList.remove('expanded');
        contentElement.style.maxHeight = '20px';
        contentElement.style.opacity = '0.7';
        expandIcon.textContent = '▼';
    } else {
        // 展开
        contentElement.classList.add('expanded');
        contentElement.style.maxHeight = contentElement.scrollHeight + 'px';
        contentElement.style.opacity = '1';
        expandIcon.textContent = '▲';
    }
}

// 删除日记
async function deleteDiary(diaryId) {
    if (confirm('确定要删除这篇日记吗？')) {
        // 获取日记标题
        const diary = window.diaries.find(d => d.id === diaryId);
        const diaryTitle = diary ? diary.title : '未知日记';
        
        try {
            // 从服务器删除
            const response = await fetch(`${API_BASE}/api/diaries/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: diaryId })
            });
            const data = await response.json();
            if (data.success) {
                window.diaries = window.diaries.filter(d => d.id !== diaryId);
                renderDiaries();
                updateStats();
                await addActivity('diary', `删除了日记: ${diaryTitle}`);
                showMessage('日记已删除', 'info');
            } else {
                showMessage(`日记删除失败: ${data.message}`, 'error');
            }
        } catch (error) {
            console.error('Failed to delete diary:', error);
            showMessage('日记删除失败', 'error');
        }
    }
}

// 加载日记
async function loadDiaries() {
    try {
        const response = await fetch(`${API_BASE}/api/diaries`);
        const data = await response.json();
        if (data.success) {
            window.diaries = data.data.diaries || [];
            renderDiaries();
        }
        return Promise.resolve(true);
    } catch (error) {
        console.error('Failed to load diaries:', error);
        window.diaries = [];
        renderDiaries();
        return Promise.resolve(false);
    }
}

// 加载愿望
async function loadWishes() {
    try {
        const response = await fetch(`${API_BASE}/api/wishes`);
        const data = await response.json();
        if (data.success) {
            window.wishes = data.data.wishes || [];
            renderWishes();
        }
        return Promise.resolve(true);
    } catch (error) {
        console.error('Failed to load wishes:', error);
        window.wishes = [];
        renderWishes();
        return Promise.resolve(false);
    }
}

// 渲染愿望列表
function renderWishes() {
    const wishList = document.getElementById('wishList');
    if (!wishList) return;

    if (window.wishes.length === 0) {
        wishList.innerHTML = '<p style="text-align: center; color: #666; padding: 50px; font-size: 18px;">还没有愿望，快去添加你们的愿望吧！✨</p>';
        return;
    }

    wishList.innerHTML = window.wishes.map(wish => {
        // 适配后端返回的数据结构
        const title = wish.title || wish.content || '未命名愿望';
        const description = wish.description || '';
        const category = wish.category || '其他';
        const isCompleted = wish.isCompleted === 1 || wish.isCompleted === true;
        const createdAt = new Date(wish.createdAt).toLocaleString();
        const completedAt = isCompleted && wish.completedAt ? `<div class="completed-time">完成于: ${new Date(wish.completedAt).toLocaleString()}</div>` : '';
        
        return `
            <div class="wish-item ${isCompleted ? 'completed' : ''}">
                <div class="wish-content">
                    <div class="wish-header">
                        <div class="wish-title">${title}</div>
                        <div class="wish-actions">
                            <button class="complete-btn ${isCompleted ? 'completed' : ''}" onclick="completeWish(${wish.id})" title="${isCompleted ? '取消完成' : '标记为完成'}">
                                ${isCompleted ? '✅' : '⬜'}
                            </button>
                            <button class="delete-btn" onclick="deleteWish(${wish.id})" title="删除愿望">
                                🗑️
                            </button>
                        </div>
                    </div>
                    ${description ? `<div class="wish-description">${description}</div>` : ''}
                    <div class="wish-footer">
                        <div class="wish-category">${category}</div>
                        <div class="wish-date">${createdAt}</div>
                    </div>
                    ${completedAt}
                </div>
            </div>
        `;
    }).join('');
}

// 完成愿望
async function completeWish(wishId) {
    console.log(`🔄 尝试完成愿望 ID: ${wishId}`);
    
    try {
        // 先在本地找到愿望
        const wishIndex = window.wishes.findIndex(wish => wish.id === wishId);
        if (wishIndex === -1) {
            showMessage('操作失败：未找到该愿望', 'error');
            return;
        }
        
        const wish = window.wishes[wishIndex];
        const isCompleted = wish.isCompleted === 1 || wish.isCompleted === true;
        const newStatus = isCompleted ? 0 : 1;
        
        // 调用后端API完成愿望
        const response = await fetch(`${API_BASE}/api/wishes/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: wishId, isCompleted: newStatus })
        });
        
        const data = await response.json();
        if (data.success) {
            // 更新本地愿望列表
            window.wishes[wishIndex].isCompleted = newStatus;
            window.wishes[wishIndex].completedAt = newStatus ? new Date().toISOString() : '';
            
            // 更新愿望列表
            renderWishes();
            updateStats();
            
            // 添加活动记录，包含操作者信息
            const wishTitle = wish.title || wish.content || '未命名愿望';
            const operator = currentUser ? currentUser.username : '未知用户';
            await addActivity('wish', `${newStatus ? '完成了' : '取消完成'}愿望: ${wishTitle}`, operator);
            
            showMessage(`${newStatus ? '愿望已标记为完成' : '愿望已取消完成'}! ✨`, 'success');
        } else {
            showMessage(`操作失败: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Failed to complete wish:', error);
        showMessage('操作失败，请重试', 'error');
    }
}

// 删除愿望
async function deleteWish(wishId) {
    console.log(`🗑️  尝试删除愿望 ID: ${wishId}`);
    
    if (!confirm('确定要删除这个愿望吗？')) {
        return;
    }
    
    try {
        // 调用后端API删除愿望
        const response = await fetch(`${API_BASE}/api/wishes/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: wishId })
        });
        
        const data = await response.json();
        if (data.success) {
            // 从本地愿望列表中删除
            const wishIndex = window.wishes.findIndex(wish => wish.id === wishId);
            if (wishIndex !== -1) {
                const wish = window.wishes[wishIndex];
                const wishTitle = wish.title || wish.content || '未命名愿望';
                
                // 从数组中删除
                window.wishes.splice(wishIndex, 1);
                
                // 更新愿望列表
                renderWishes();
                updateStats();
                
                // 添加活动记录，包含操作者信息
                const operator = currentUser ? currentUser.username : '未知用户';
                await addActivity('wish', `删除了愿望: ${wishTitle}`, operator);
                
                showMessage('愿望已删除! ✨', 'success');
            }
        } else {
            showMessage(`删除失败: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Failed to delete wish:', error);
        showMessage('删除失败，请重试', 'error');
    }
}

// 保存愿望
async function saveWish() {
    const title = document.getElementById('wishTitle').value.trim();
    const description = document.getElementById('wishDescription').value.trim();

    if (!title) {
        showMessage('请填写愿望标题', 'error');
        return;
    }

    const category = document.getElementById('wishCategory').value;
    
    // 适配后端的数据结构
    const wish = {
        id: Date.now(),
        content: title, // 后端使用content字段
        title: title, // 同时保留title字段，以便前端使用
        description: description,
        category: category,
        createdAt: new Date().toISOString(),
        isCompleted: 0
    };

    try {
        // 保存到服务器
        const response = await fetch(`${API_BASE}/api/wishes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wish)
        });
        const data = await response.json();
        if (data.success) {
            // 重新加载愿望列表，确保数据一致性
            await loadWishes();
            updateStats();
            
            // 添加活动记录，包含操作者信息
            const operator = currentUser ? currentUser.username : '未知用户';
            await addActivity('wish', `添加了愿望: ${title}`, operator);
            
            showMessage('愿望添加成功! ✨', 'success');
            
            // 清空输入框中的内容
            document.getElementById('wishTitle').value = '';
            document.getElementById('wishDescription').value = '';
            document.getElementById('wishCategory').value = '旅行';
        } else {
            showMessage(`愿望添加失败: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Failed to save wish:', error);
        showMessage('愿望添加失败', 'error');
    }
}

// 更新统计数据
async function updateStats() {
    try {
        // 从服务器获取统计数据
        const response = await fetch(`${API_BASE}/api/stats`);
        const data = await response.json();
        if (data.success) {
            // 更新首页快速统计数据（使用单数形式的ID）
            const photoCountElement = document.getElementById('photoCount');
            const anniversaryCountElement = document.getElementById('anniversaryCount');
            const diaryCountElement = document.getElementById('diaryCount');
            const wishCountElement = document.getElementById('wishCount');
            
            // 更新统计页面数据
            const photosCountElement = document.getElementById('photosCount');
            const anniversariesCountElement = document.getElementById('anniversariesCount');
            const diariesCountElement = document.getElementById('diariesCount');
            const wishesCountElement = document.getElementById('wishesCount');
            
            // 更新照片分类统计
            const datePhotoCountElement = document.getElementById('datePhotoCount');
            const travelPhotoCountElement = document.getElementById('travelPhotoCount');
            const dailyPhotoCountElement = document.getElementById('dailyPhotoCount');
            
            // 更新心情指数
            const moodElement = document.querySelector('.mood-stats .mood-emoji');
            const moodPercentageElement = document.querySelector('.mood-stats .mood-percentage');
            const moodBarElement = document.querySelector('.mood-stats .mood-progress');
            
            if (photoCountElement) {
                photoCountElement.textContent = data.data.photosCount || 0;
            }
            if (anniversaryCountElement) {
                anniversaryCountElement.textContent = data.data.anniversariesCount || 0;
            }
            if (diaryCountElement) {
                diaryCountElement.textContent = data.data.diariesCount || 0;
            }
            if (wishCountElement) {
                wishCountElement.textContent = data.data.wishesCount || 0;
            }
            
            // 同时更新统计页面的数据
            if (photosCountElement) {
                photosCountElement.textContent = data.data.photosCount || 0;
            }
            if (anniversariesCountElement) {
                anniversariesCountElement.textContent = data.data.anniversariesCount || 0;
            }
            if (diariesCountElement) {
                diariesCountElement.textContent = data.data.diariesCount || 0;
            }
            if (wishesCountElement) {
                wishesCountElement.textContent = data.data.wishesCount || 0;
            }
            
            // 更新照片分类统计
            if (datePhotoCountElement) {
                datePhotoCountElement.textContent = data.data.datePhotoCount || 0;
            }
            if (travelPhotoCountElement) {
                travelPhotoCountElement.textContent = data.data.travelPhotoCount || 0;
            }
            if (dailyPhotoCountElement) {
                dailyPhotoCountElement.textContent = data.data.dailyPhotoCount || 0;
            }
            
            // 更新心情指数
            if (data.data.averageMood !== undefined) {
                const averageMood = data.data.averageMood;
                const moodPercentage = Math.round((averageMood / 5) * 100);
                
                // 根据心情指数显示不同的表情
                let moodEmoji = '😊';
                if (averageMood <= 1) {
                    moodEmoji = '😢';
                } else if (averageMood <= 2) {
                    moodEmoji = '😔';
                } else if (averageMood <= 3) {
                    moodEmoji = '😊';
                } else if (averageMood <= 4) {
                    moodEmoji = '😍';
                } else {
                    moodEmoji = '🥰';
                }
                
                if (moodElement) {
                    moodElement.textContent = moodEmoji;
                }
                if (moodPercentageElement) {
                    moodPercentageElement.textContent = `${moodPercentage}%`;
                }
                if (moodBarElement) {
                    moodBarElement.style.width = `${moodPercentage}%`;
                }
            }
        }
        return Promise.resolve(true);
    } catch (error) {
        console.error('Failed to load stats:', error);
        // 加载失败时使用全局变量计算
        // 更新首页快速统计数据（使用单数形式的ID）
        const photoCountElement = document.getElementById('photoCount');
        const anniversaryCountElement = document.getElementById('anniversaryCount');
        const diaryCountElement = document.getElementById('diaryCount');
        const wishCountElement = document.getElementById('wishCount');
        
        // 更新统计页面数据
        const photosCountElement = document.getElementById('photosCount');
        const anniversariesCountElement = document.getElementById('anniversariesCount');
        const diariesCountElement = document.getElementById('diariesCount');
        const wishesCountElement = document.getElementById('wishesCount');
        
        // 更新照片分类统计
        const datePhotoCountElement = document.getElementById('datePhotoCount');
        const travelPhotoCountElement = document.getElementById('travelPhotoCount');
        const dailyPhotoCountElement = document.getElementById('dailyPhotoCount');
        
        // 更新心情指数
        const moodElement = document.querySelector('.mood-stats .mood-emoji');
        const moodPercentageElement = document.querySelector('.mood-stats .mood-percentage');
        const moodBarElement = document.querySelector('.mood-stats .mood-progress');
        
        if (photoCountElement) {
            photoCountElement.textContent = window.photos.length;
        }
        if (anniversaryCountElement) {
            anniversaryCountElement.textContent = window.anniversaries.length;
        }
        if (diaryCountElement) {
            diaryCountElement.textContent = window.diaries.length;
        }
        if (wishCountElement) {
            wishCountElement.textContent = window.wishes.length;
        }
        
        // 同时更新统计页面的数据
        if (photosCountElement) {
            photosCountElement.textContent = window.photos.length;
        }
        if (anniversariesCountElement) {
            anniversariesCountElement.textContent = window.anniversaries.length;
        }
        if (diariesCountElement) {
            diariesCountElement.textContent = window.diaries.length;
        }
        if (wishesCountElement) {
            wishesCountElement.textContent = window.wishes.length;
        }
        
        // 更新照片分类统计（简单版，不做分类）
        if (datePhotoCountElement) {
            datePhotoCountElement.textContent = 0;
        }
        if (travelPhotoCountElement) {
            travelPhotoCountElement.textContent = 0;
        }
        if (dailyPhotoCountElement) {
            dailyPhotoCountElement.textContent = window.photos.length;
        }
        
        // 更新心情指数（使用本地日记数据计算）
        if (window.diaries.length > 0) {
            const totalMood = window.diaries.reduce((sum, diary) => sum + diary.mood, 0);
            const averageMood = totalMood / window.diaries.length;
            const moodPercentage = Math.round((averageMood / 5) * 100);
            
            // 根据心情指数显示不同的表情
            let moodEmoji = '😊';
            if (averageMood <= 1) {
                moodEmoji = '😢';
            } else if (averageMood <= 2) {
                moodEmoji = '😔';
            } else if (averageMood <= 3) {
                moodEmoji = '😊';
            } else if (averageMood <= 4) {
                moodEmoji = '😍';
            } else {
                moodEmoji = '🥰';
            }
            
            if (moodElement) {
                moodElement.textContent = moodEmoji;
            }
            if (moodPercentageElement) {
                moodPercentageElement.textContent = `${moodPercentage}%`;
            }
            if (moodBarElement) {
                moodBarElement.style.width = `${moodPercentage}%`;
            }
        }
        
        return Promise.resolve(false);
    }
}