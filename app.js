// ===================================
// TrendChef - Interactive Functionality
// ===================================

// State Management
const state = {
    currentTab: 'home',
    credits: 3,
    discoveryCategory: 'all',
    discoverySearch: '',
    savedRecipes: [],
    lastRecipe: null,
    customPrefs: [],
    dietaryGuideline: {
        userInput: '',
        report: '',
        generatedAt: null,
        isSet: false
    }
};

// Mock Data - 农场发现数据
const mockRecipes = {
    all: [
        {
            title: '新鲜有机白萝卜',
            heat: '今日上新',
            platform: '农场直供',
            badge: '有机认证',
            statusIcon: '🌱',
            price: '9.9/斤',
            desc: '当日采收冷链直达，脆甜多汁，适合凉拌/炖汤。',
            highlight: '硝酸盐低，适合三高人群',
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop'
        },
        {
            title: '青菜心蔬菜箱',
            heat: '当季特供',
            platform: '有机认证',
            badge: '精选套餐',
            statusIcon: '📦',
            price: '39.9/箱',
            desc: '8款时令绿叶菜组合，适合三口之家一周量。',
            highlight: '低农残检测报告可查',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop'
        },
        {
            title: '红彭土豆',
            heat: '热卖中',
            platform: '农场直供',
            badge: '耐储藏',
            statusIcon: '🔥',
            price: '4.8/斤',
            desc: '粉糯型，适合土豆泥、炖牛肉。',
            image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&h=300&fit=crop'
        },
        {
            title: '新鲜草莓',
            heat: '限量采摘',
            platform: '即将上市',
            badge: '采摘预约',
            statusIcon: '📅',
            price: '59/盒',
            desc: '大棚无农药，周末可自提/现场采摘体验。',
            image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop'
        },
        {
            title: '有机番茄',
            heat: '每日限量',
            platform: '农场直供',
            badge: '沙瓤更甜',
            statusIcon: '✅',
            price: '12.9/斤',
            desc: '日照充足，适合凉拌/做酱。',
            image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop'
        },
        {
            title: '甜玉米',
            heat: '新鲜采摘',
            platform: '当季特供',
            badge: '儿童友好',
            statusIcon: '🌽',
            price: '2.5/根',
            desc: '0 冷冻，甜糯口感，娃爱吃。',
            image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop'
        }
    ],
    healthy: [
        {
            title: '有机蔬菜礼盒',
            heat: '健康首选',
            platform: '有机认证',
            badge: '富含膳食纤维',
            statusIcon: '🥗',
            price: '69/盒',
            desc: '涵盖深色叶菜+菌菇，适合控糖减脂。',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop'
        },
        {
            title: '低糖南瓜',
            heat: '适合三高',
            platform: '农场直供',
            badge: '低GI',
            statusIcon: '🩺',
            price: '5.5/斤',
            desc: '蒸/煲汤皆宜，软糯低糖，秋冬养胃。',
            image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&h=300&fit=crop'
        }
    ],
    budget: [
        {
            title: '周末采摘活动',
            heat: '亲子推荐',
            platform: '限时报名',
            badge: '家庭票',
            statusIcon: '👨‍👩‍👧‍👦',
            price: '99/家庭',
            desc: '包含2斤采摘额度+农场讲解。',
            image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop'
        },
        {
            title: '蔬菜箱套餐',
            heat: '超值优惠',
            platform: '限量抢购',
            badge: '组合装',
            statusIcon: '💰',
            price: '29.9/箱',
            desc: '精选6款基础菜，性价比之选。',
            image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop'
        }
    ],
    seasonal: [
        {
            title: '草莓采摘预告',
            heat: '下周开放',
            platform: '提前预约',
            badge: '体验',
            statusIcon: '📅',
            price: '预约中',
            desc: '可选周末上午场/下午场。',
            image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop'
        },
        {
            title: '冬季白萝卜',
            heat: '霜降后更甜',
            platform: '即将上市',
            badge: '当季必吃',
            statusIcon: '❄️',
            price: '8.9/斤',
            desc: '适合炖汤、凉拌，口感脆甜。',
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop'
        }
    ]
};

const mockGeneratedRecipes = [
    {
        title: '网红瀑布土豆泥',
        description: '结合当前社交媒体最火的做法，口感绵密，视觉效果惊艳，完美适合拍照分享。',
        time: '30分钟',
        serving: '2-3人',
        difficulty: '简单',
        image: 'https://images.unsplash.com/photo-1585238341710-4a2f0e9e0e7f?w=800&h=600&fit=crop',
        steps: [
            '土豆去皮切块，蒸15分钟至软烂',
            '趁热加入黄油30g、牛奶100ml、盐适量',
            '用压泥器压成细腻的泥状',
            '装入裱花袋，从高处挤出形成"瀑布"效果',
            '表面撒上黑胡椒和香葱点缀'
        ],
        tips: '💡 大数据小贴士：最近流行在土豆泥中加入少量芝士，口感更加丝滑。网友反馈：挤的时候一定要从高处往下，才能形成完美的瀑布效果！'
    },
    {
        title: '空气炸锅香脆鸡翅',
        description: '零油烹饪，外酥里嫩，健康又美味的网红做法。',
        time: '25分钟',
        serving: '2人',
        difficulty: '简单',
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&h=600&fit=crop',
        steps: [
            '鸡翅洗净，两面划刀',
            '加入生抽、料酒、蜂蜜、蒜末腌制30分钟',
            '空气炸锅预热180度',
            '鸡翅放入炸篮，180度烤15分钟',
            '翻面继续烤8分钟至金黄'
        ],
        tips: '💡 大数据小贴士：网友反馈腌制时加入可乐，口感更嫩！记得中途翻面，确保两面都烤得均匀。'
    }
];

// ===================================
// Initialization
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    setupHealthProfileListeners(); // 添加健康档案监听器
    loadDiscoveryFeed();
});

function initializeApp() {
    updateCreditsDisplay();
    switchTab('home');
    
    // 为了方便演示，每次刷新不自动加载已保存的膳食档案
    // hydrateGuidelineFromStorage(); 
    
    hydrateSavedRecipes();
    hydrateCustomPrefs();
    renderCookbook();
    renderCustomPrefs();
    
    // 初始化时更新UI状态（此时 isSet 默认为 false）
    updateGuidelineUI();
    
    // Initialize FAB button visibility
    const fabContainer = document.querySelector('.fab-container');
    if (fabContainer) {
        fabContainer.style.display = 'none';
    }
}

// ===================================
// Event Listeners
// ===================================

function setupEventListeners() {
    // Bottom Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            switchTab(tab);
        });
    });

    // Trending Tags
    const tagButtons = document.querySelectorAll('.tag-btn');
    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById('ingredientInput');
            const currentValue = input.value.trim();
            const tagText = btn.textContent;

            if (currentValue) {
                input.value = currentValue + ', ' + tagText;
            } else {
                input.value = tagText;
            }

            // Add visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });

    // Generate Button
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerate);
    }

    // Save Recipe
    const saveRecipeBtn = document.getElementById('saveRecipeBtn');
    if (saveRecipeBtn) {
        saveRecipeBtn.addEventListener('click', handleSaveRecipe);
    }

    // Category Tabs (in header)
    const categoryTabs = document.querySelectorAll('.header-category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            tab.classList.add('active');
            const category = tab.dataset.category;
            switchCategory(category);
        });
    });

    // Discovery search
    const headerSearchInput = document.getElementById('headerSearchInput');
    if (headerSearchInput) {
        headerSearchInput.addEventListener('input', (e) => {
            state.discoverySearch = e.target.value;
            loadDiscoveryFeed();
        });
    }

    // FAB Button
    const fabBtn = document.getElementById('fabBtn');
    const fabMenu = document.getElementById('fabMenu');

    fabBtn.addEventListener('click', () => {
        fabMenu.classList.toggle('active');
    });

    // FAB Menu Items
    const fabMenuItems = document.querySelectorAll('.fab-menu-item');
    fabMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            if (action === 'publish-product') {
                handlePublish('product');
            } else if (action === 'publish-activity') {
                handlePublish('activity');
            }
            fabMenu.classList.remove('active');
        });
    });

    // Close FAB menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabBtn.contains(e.target) && !fabMenu.contains(e.target)) {
            fabMenu.classList.remove('active');
        }
    });

    // Custom preference add
    const addCustomPrefBtn = document.getElementById('addCustomPrefBtn');
    const customPrefInput = document.getElementById('customPrefInput');
    if (addCustomPrefBtn && customPrefInput) {
        const handleAdd = () => {
            const label = customPrefInput.value.trim();
            if (!label) {
                customPrefInput.focus();
                return;
            }
            addCustomPref(label, '');
            customPrefInput.value = '';
        };
        addCustomPrefBtn.addEventListener('click', handleAdd);
        customPrefInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleAdd();
        });
    }
}

// ===================================
// Tab Navigation
// ===================================

function switchTab(tabName) {
    state.currentTab = tabName;

    // Update nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.dataset.tab === tabName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        if (section.id === tabName) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    // Update header title
    const headerTitle = document.getElementById('headerTitle');
    if (headerTitle) {
        const map = {
            home: 'AI农庄美食专家',
            discover: '发现',
            cookbook: '食谱',
            profile: ''  // 我的页面不显示标题
        };
        const title = Object.prototype.hasOwnProperty.call(map, tabName)
            ? map[tabName]
            : '发现';
        headerTitle.textContent = title;
        
        // 首页、食谱和发现页面时，标题左对齐，位置保持一致
        if (tabName === 'home' || tabName === 'cookbook' || tabName === 'discover') {
            headerTitle.style.textAlign = 'left';
            headerTitle.style.flex = '0 0 auto';
        } else {
            headerTitle.style.textAlign = 'center';
            headerTitle.style.flex = '1';
        }
    }

    // Hide/show header button based on current tab
    const headerBtn = document.getElementById('dietaryGuidelineBtn');
    if (headerBtn) {
        if (tabName === 'profile' || tabName === 'discover') {
            headerBtn.style.display = 'none';
        } else {
            headerBtn.style.display = 'flex';
        }
    }

    const headerSearch = document.getElementById('headerSearch');
    if (headerSearch) {
        if (tabName === 'discover') {
            headerSearch.classList.remove('hidden');
        } else {
            headerSearch.classList.add('hidden');
        }
    }

    // Hide/show header category tabs
    const headerCategoryTabs = document.getElementById('headerCategoryTabs');
    if (headerCategoryTabs) {
        if (tabName === 'discover') {
            headerCategoryTabs.classList.remove('hidden');
        } else {
            headerCategoryTabs.classList.add('hidden');
        }
    }

    // Hide/show FAB button (only show on discover page)
    const fabContainer = document.querySelector('.fab-container');
    if (fabContainer) {
        if (tabName === 'discover') {
            fabContainer.style.display = 'block';
        } else {
            fabContainer.style.display = 'none';
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// Recipe Generation
// ===================================

function handleGenerate() {
    const input = document.getElementById('ingredientInput');
    const inputValue = input.value.trim();

    if (!inputValue) {
        // Shake animation for empty input
        input.style.animation = 'shake 0.5s';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
        return;
    }

    // Show loading state
    const loadingState = document.getElementById('loadingState');
    const loadingText = loadingState.querySelector('.loading-text');
    const recipeResult = document.getElementById('recipeResult');

    loadingState.classList.add('active');
    recipeResult.classList.remove('active');

    // 模拟过程：如果已关联档案，加载文案会有变化
    if (state.dietaryGuideline.isSet) {
        loadingText.textContent = 'AI 正在研读您的膳食档案...';
        setTimeout(() => {
            loadingText.textContent = '正在为您优化健康烹饪方案...';
        }, 1000);
    } else {
        loadingText.textContent = 'AI 正在为你生成食谱...';
    }

    // Simulate AI generation (2 seconds)
    setTimeout(() => {
        loadingState.classList.remove('active');
        displayRecipe(inputValue);
    }, 2000);
}

function displayRecipe(ingredient) {
    // Select a random recipe from mock data
    const recipe = mockGeneratedRecipes[Math.floor(Math.random() * mockGeneratedRecipes.length)];
    renderSpecificRecipe({ ...recipe, ingredientInput: ingredient });
}

function renderSpecificRecipe(recipe) {
    state.lastRecipe = { ...recipe, savedAt: recipe.savedAt || new Date().toISOString() };

    // Update result card
    document.getElementById('resultImage').src = recipe.image;
    document.getElementById('resultTitle').textContent = recipe.title;
    document.getElementById('resultDescription').textContent = recipe.description;
    document.getElementById('resultTime').textContent = recipe.time;
    document.getElementById('resultServing').textContent = recipe.serving;
    document.getElementById('resultDifficulty').textContent = recipe.difficulty;

    // Update steps
    const stepsContainer = document.getElementById('resultSteps');
    stepsContainer.innerHTML = '<h4>烹饪步骤</h4><ol>' +
        recipe.steps.map(step => `<li>${step}</li>`).join('') +
        '</ol>';

    // Update tips
    const tipsContainer = document.getElementById('resultTips');
    
    // 如果有档案，增加一个专属的“AI 膳食优化建议”
    let dietaryHtml = '';
    if (state.dietaryGuideline.isSet) {
        dietaryHtml = `
            <div class="dietary-optimization-note">
                <div class="opt-header">✨ AI 膳食优化建议 (已关联档案)</div>
                <p>针对您的健康需求，AI 已自动减少了食谱中的油脂用量，并建议将精制面粉替换为全麦选项以平衡基础代谢。</p>
            </div>
        `;
    }
    
    tipsContainer.innerHTML = dietaryHtml + `<p>${recipe.tips}</p>`;

    // --- 新增：AI 灵感探索模块 ---
    renderInspirations(recipe);

    // Show result
    const recipeResult = document.getElementById('recipeResult');
    recipeResult.classList.add('active');

    // Scroll to result
    setTimeout(() => {
        recipeResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ===================================
// Discovery Feed
// ===================================

function handlePublish(type) {
    const typeMap = {
        product: '农产品',
        activity: '活动'
    };
    const typeName = typeMap[type] || '内容';
    
    // 这里可以打开发布表单弹窗或跳转到发布页面
    // 目前先显示提示，后续可以接入实际的发布功能
    if (type === 'product') {
        alert(`发布农产品功能开发中，敬请期待！\n\n农户可以通过此功能发布：\n- 蔬菜、水果等农产品信息\n- 价格和库存\n- 产地和采摘时间等`);
    } else {
        alert(`发布${typeName}功能开发中，敬请期待！\n\n农户可以通过此功能发布：\n- ${typeName}信息\n- 活动时间和地点\n- 参与方式等`);
    }
    
    // TODO: 实现发布表单弹窗
    // showPublishModal(type);
}

function loadDiscoveryFeed() {
    const feed = document.getElementById('discoveryFeed');
    const recipes = mockRecipes[state.discoveryCategory];
    const q = state.discoverySearch.trim().toLowerCase();
    const filtered = q
        ? recipes.filter(r =>
            (r.title && r.title.toLowerCase().includes(q)) ||
            (r.desc && r.desc.toLowerCase().includes(q))
        )
        : recipes;

    if (!filtered || filtered.length === 0) {
        feed.innerHTML = `<div class="empty-state"><p>没有找到匹配的农产品</p></div>`;
        return;
    }

    feed.innerHTML = filtered.map(recipe => `
        <div class="discovery-card">
            <div class="discovery-card-image">
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
            <div class="discovery-card-content">
                <h3 class="discovery-card-title">${recipe.title}</h3>
                ${recipe.desc ? `<p class="discovery-desc">${recipe.desc}</p>` : ''}
                <div class="discovery-meta">
                    ${recipe.price ? `<span class="price-tag">¥${recipe.price}</span>` : ''}
                    <span class="platform-badge">${recipe.platform}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers to cards
    const cards = feed.querySelectorAll('.discovery-card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            showRecipeDetail(recipes[index]);
        });
    });
}

function switchCategory(category) {
    state.discoveryCategory = category;

    // Update active tab
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Reload feed
    loadDiscoveryFeed();
}

function showRecipeDetail(recipe) {
    alert(
        `查看农产品：${recipe.title}\n` +
        `来源：${recipe.platform}\n` +
        (recipe.price ? `价格：¥${recipe.price}\n` : '') +
        (recipe.desc ? `简介：${recipe.desc}\n` : '') +
        (recipe.highlight ? `亮点：${recipe.highlight}\n` : '') +
        '（演示版，详页待接入后台数据）'
    );
}

// ===================================
// Link Parser (Demo)
// ===================================

function showLinkParser() {
    const url = prompt('粘贴视频或文章链接：\n(支持抖音、TikTok、小红书、公众号)');

    if (url) {
        alert('🔗 链接解析功能\n\n正在解析链接...\n这是演示版本，完整版本会自动提取视频字幕或文章内容，并生成标准化的食谱卡片。');
    }
}

// ===================================
// Credits Management
// ===================================

function updateCreditsDisplay() {
    // Update header badge
    const creditsCount = document.getElementById('creditsCount');
    if (creditsCount) {
        creditsCount.textContent = state.credits;
        creditsCount.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            creditsCount.style.animation = '';
        }, 500);
    }

    // Update profile credits
    const profileCredits = document.getElementById('profileCredits');
    if (profileCredits) {
        profileCredits.textContent = state.credits;
    }

    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        const percentage = (state.credits / 3) * 100;
        progressFill.style.width = percentage + '%';
    }

}

// ===================================
// Animations
// ===================================

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// ===================================
// Scroll Effects
// ===================================

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add subtle parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && scrollTop < 500) {
        heroSection.style.transform = `translateY(${scrollTop * 0.3}px)`;
        heroSection.style.opacity = 1 - (scrollTop / 500);
    }

    lastScrollTop = scrollTop;
});

// ===================================
// Utility Functions
// ===================================

// Format numbers with K/M suffix
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// Console Easter Egg
// ===================================

console.log('%c🍳 TrendChef', 'font-size: 24px; font-weight: bold; color: #52c41a;');
console.log('%c智能推荐 · 健康定制 · 一键创新', 'font-size: 14px; color: #b0b0b0;');
console.log('%c农庄智能平台', 'font-size: 12px; color: #707070;');


// ===================================
// Dietary Guideline Functions & Welcome Modal
// ===================================

function setupHealthProfileListeners() {
    // Note: Function name kept for compatibility with init chain, 
    // but logic is now for Dietary Guideline

    const guidelineBtn = document.getElementById('dietaryGuidelineBtn');
    const modal = document.getElementById('dietaryModal');
    const closeBtn = document.getElementById('dietaryModalClose');
    const overlay = document.querySelector('.health-modal-overlay');
    const promptBtn = document.getElementById('promptGenerateBtn');

    // Open/Close Modal Logic
    const openModal = () => {
        modal.classList.add('active');
        checkGuidelineState();
    };

    const closeModal = () => modal.classList.remove('active');

    if (guidelineBtn) guidelineBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    if (promptBtn) promptBtn.addEventListener('click', openModal);

    // Generation Logic
    const generateBtn = document.getElementById('generateGuidelineBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerateGuideline);
    }

    // Re-edit & Save
    const reEditBtn = document.getElementById('reEditBtn');
    const editReportContentBtn = document.getElementById('editReportContentBtn');
    const saveBtn = document.getElementById('saveGuidelineBtn');
    const reportContent = document.getElementById('dietaryReportContent');
    const reportEditor = document.getElementById('dietaryReportEditor');

    if (reEditBtn) {
        reEditBtn.addEventListener('click', () => {
            document.getElementById('dietaryInputStep').style.display = 'flex';
            document.getElementById('dietaryReportStep').style.display = 'none';
            // 重置编辑模式
            if (reportContent) reportContent.style.display = 'block';
            if (reportEditor) reportEditor.style.display = 'none';
            if (editReportContentBtn) editReportContentBtn.textContent = '编辑内容';
        });
    }

    if (editReportContentBtn) {
        editReportContentBtn.addEventListener('click', () => {
            const isEditing = reportEditor.style.display === 'block';
            if (isEditing) {
                // 完成编辑：同步回 state 并重新渲染预览
                state.dietaryGuideline.report = reportEditor.value;
                reportContent.innerHTML = markedParse(state.dietaryGuideline.report);
                reportContent.style.display = 'block';
                reportEditor.style.display = 'none';
                editReportContentBtn.textContent = '编辑内容';
            } else {
                // 开始编辑：显示文本框，填入原始报告文本
                reportEditor.value = state.dietaryGuideline.report;
                reportContent.style.display = 'none';
                reportEditor.style.display = 'block';
                editReportContentBtn.textContent = '完成编辑';
                reportEditor.focus();
            }
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // 如果还在编辑模式，同步最后的内容
            if (reportEditor && reportEditor.style.display === 'block') {
                state.dietaryGuideline.report = reportEditor.value;
            }
            saveGuideline();
        });
    }

    // Initialize UI
    updateGuidelineUI();

    // Check Welcome Modal
    checkFirstVisit();
}

function checkFirstVisit() {
    const welcomeModal = document.getElementById('welcomeModal');

    if (welcomeModal) {
        welcomeModal.style.display = 'flex';

        // Handle Welcome Actions
        document.getElementById('welcomeGenerateBtn').addEventListener('click', () => {
            welcomeModal.style.display = 'none';
            document.getElementById('dietaryModal').classList.add('active');
        });

        document.getElementById('welcomeSkipBtn').addEventListener('click', () => {
            welcomeModal.style.display = 'none';
        });
    }
}

function handleGenerateGuideline() {
    const input = document.getElementById('dietaryInput').value.trim();
    if (!input || input.length < 10) {
        alert('请至少输入10个字的描述，以便AI为您生成精准建议。');
        return;
    }

    state.dietaryGuideline.userInput = input;

    // Switch to Loading
    document.getElementById('dietaryInputStep').style.display = 'none';
    const loadingEl = document.getElementById('dietaryLoading');
    loadingEl.style.display = 'flex';

    // Simulate AI API Call (2.5 seconds)
    setTimeout(() => {
        const report = generateMockReport(input);
        state.dietaryGuideline.report = report;
        state.dietaryGuideline.generatedAt = new Date().toISOString();
        // 生成新报告时，重置保存状态（因为内容已更新）
        state.dietaryGuideline.isSet = false;

        // Render Report
        loadingEl.style.display = 'none';
        const reportStep = document.getElementById('dietaryReportStep');
        reportStep.style.display = 'flex';
        document.getElementById('dietaryReportContent').innerHTML = markedParse(report);
        
        // 更新按钮状态
        const saveBtn = document.getElementById('saveGuidelineBtn');
        if (saveBtn) {
            saveBtn.textContent = '保存到我的档案';
            saveBtn.classList.remove('saved');
        }

    }, 2500);
}

function saveGuideline() {
    state.dietaryGuideline.isSet = true;
    persistGuideline();
    
    // 更新按钮状态
    const saveBtn = document.getElementById('saveGuidelineBtn');
    if (saveBtn) {
        saveBtn.textContent = '已保存';
        saveBtn.classList.add('saved');
    }
    
    document.getElementById('dietaryModal').classList.remove('active');
    updateGuidelineUI();
    alert('✅ 个性化膳食档案已保存！AI已为您优化推荐算法。');
}

function updateGuidelineUI() {
    const hint = document.getElementById('guidelineHint');
    const prompt = document.getElementById('guidelinePrompt');

    if (state.dietaryGuideline.isSet) {
        if (hint) hint.classList.add('active');
        if (prompt) prompt.style.display = 'none';
        renderCookbook();
        renderProfileGuideline();
    } else {
        if (hint) hint.classList.remove('active');
        if (prompt) prompt.style.display = 'flex';
        renderCookbook();
        renderProfileGuideline();
    }
}

function checkGuidelineState() {
    const saveBtn = document.getElementById('saveGuidelineBtn');
    if (state.dietaryGuideline.report) {
        document.getElementById('dietaryInputStep').style.display = 'none';
        document.getElementById('dietaryReportStep').style.display = 'flex';
        document.getElementById('dietaryReportContent').innerHTML = markedParse(state.dietaryGuideline.report);
        
        // 更新按钮文字：如果已保存，显示"已保存"，否则显示"保存到我的档案"
        if (saveBtn) {
            if (state.dietaryGuideline.isSet) {
                saveBtn.textContent = '已保存';
                saveBtn.classList.add('saved');
            } else {
                saveBtn.textContent = '保存到我的档案';
                saveBtn.classList.remove('saved');
            }
        }
    } else {
        document.getElementById('dietaryInputStep').style.display = 'flex';
        document.getElementById('dietaryReportStep').style.display = 'none';
        
        // 重置按钮状态
        if (saveBtn) {
            saveBtn.textContent = '保存到我的档案';
            saveBtn.classList.remove('saved');
        }
    }
}

function hydrateGuidelineFromStorage() {
    const raw = localStorage.getItem('trendchef_guideline');
    if (!raw) return;
    try {
        const parsed = JSON.parse(raw);
        state.dietaryGuideline = { ...state.dietaryGuideline, ...parsed, isSet: true };
        updateGuidelineUI();
    } catch (err) {
        console.warn('无法读取已保存的膳食档案', err);
    }
}

function persistGuideline() {
    localStorage.setItem('trendchef_guideline', JSON.stringify(state.dietaryGuideline));
}

function renderCookbook() {
    const cookbookGrid = document.getElementById('cookbookGrid');

    if (!cookbookGrid) return;

    // 清理旧的食谱卡片
    cookbookGrid.querySelectorAll('.cookbook-card').forEach(card => card.remove());

    const emptyState = cookbookGrid.querySelector('.empty-state');
    if (emptyState) {
        emptyState.style.display = state.savedRecipes.length === 0 ? 'block' : 'none';
    }

    if (state.savedRecipes.length === 0) return;

    state.savedRecipes.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'cookbook-card';
        card.innerHTML = `
            <div class="cookbook-thumb">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cookbook-body">
                <div class="cookbook-title">${item.title}</div>
                <div class="cookbook-meta">保存于 ${new Date(item.savedAt).toLocaleString()}</div>
                <p class="cookbook-desc">${item.description || ''}</p>
                <div class="cookbook-actions">
                    <button class="action-btn primary" data-idx="${idx}" data-action="use">查看详情</button>
                    <button class="action-btn secondary" data-idx="${idx}" data-action="delete">删除</button>
                </div>
            </div>
        `;
        if (emptyState) {
            cookbookGrid.insertBefore(card, emptyState);
        } else {
            cookbookGrid.appendChild(card);
        }
    });

    cookbookGrid.querySelectorAll('.cookbook-actions button').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = Number(btn.dataset.idx);
            const action = btn.dataset.action;
            if (action === 'delete') {
                state.savedRecipes.splice(idx, 1);
                persistSavedRecipes();
                renderCookbook();
            } else if (action === 'use') {
                const recipe = state.savedRecipes[idx];
                switchTab('home');
                renderSpecificRecipe(recipe);
            }
        });
    });
}

function openGuidelineModal(mode = 'view') {
    const modal = document.getElementById('dietaryModal');
    if (!modal) return;
    
    modal.classList.add('active');
    
    // 如果是编辑模式，或者还没有报告，直接显示输入页并回填内容
    if (mode === 'edit' || !state.dietaryGuideline.report) {
        const inputStep = document.getElementById('dietaryInputStep');
        const reportStep = document.getElementById('dietaryReportStep');
        
        if (inputStep) inputStep.style.display = 'flex';
        if (reportStep) reportStep.style.display = 'none';
        
        const textarea = document.getElementById('dietaryInput');
        if (textarea) {
            // 回填之前用户输入的内容，方便修改
            textarea.value = state.dietaryGuideline.userInput || '';
            textarea.focus();
        }
    } else {
        // 查看模式：显示已生成的报告
        checkGuidelineState();
    }
}

function renderCustomPrefs() {
    const list = document.getElementById('customPrefList');
    if (!list) return;
    list.innerHTML = '';
    if (state.customPrefs.length === 0) {
        return;
    }
    state.customPrefs.forEach((item, idx) => {
        const tag = document.createElement('div');
        tag.className = 'custom-pref-tag';
        tag.innerHTML = `
            <span>${item.label}</span>
            <button class="tag-remove" data-idx="${idx}" aria-label="删除">×</button>
        `;
        list.appendChild(tag);
    });

    list.querySelectorAll('.tag-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = Number(btn.dataset.idx);
            state.customPrefs.splice(idx, 1);
            persistCustomPrefs();
            renderCustomPrefs();
        });
    });
}

function renderProfileGuideline() {
    const card = document.getElementById('profileGuidelineCard');
    const guidelinePreview = document.getElementById('guidelinePreview');
    const guidelineDate = document.getElementById('guidelineDate');

    if (!card || !guidelinePreview || !guidelineDate) return;

    const actionsContainer = card.querySelector('.guideline-actions');

    if (state.dietaryGuideline.isSet && state.dietaryGuideline.report) {
        card.classList.remove('is-empty');
        card.style.display = 'block';
        const createdAt = state.dietaryGuideline.generatedAt
            ? new Date(state.dietaryGuideline.generatedAt).toLocaleString()
            : '刚刚';
        guidelineDate.textContent = createdAt;
        const snippet = buildGuidelineSnippet(state.dietaryGuideline.report, 220);
        guidelinePreview.innerHTML = markedParse(snippet);
        
        // 恢复原始按钮布局
        if (actionsContainer) {
            actionsContainer.innerHTML = `
                <button class="action-btn primary" onclick="openGuidelineModal()">查看详情</button>
            `;
        }
    } else {
        // 未设置时显示引导样式
        card.classList.add('is-empty');
        card.style.display = 'block';
        guidelineDate.textContent = '暂无记录';
        guidelinePreview.innerHTML = `
            <div class="guideline-empty-tip">
                <p>建立个人膳食档案后，AI 将为您推荐更贴合健康需求的农场食材与烹饪方案。</p>
            </div>
        `;
        
        // 显示引导按钮
        if (actionsContainer) {
            actionsContainer.innerHTML = `
                <button class="action-btn primary" style="width: 100%; justify-content: center;" onclick="openGuidelineModal()">立即建立档案</button>
            `;
        }
    }
}

function buildGuidelineSnippet(text, maxLen) {
    const clean = text || '';
    if (clean.length <= maxLen) return clean;
    return clean.slice(0, maxLen) + '...';
}


function hydrateSavedRecipes() {
    const raw = localStorage.getItem('trendchef_saved_recipes');
    if (!raw) return;
    try {
        state.savedRecipes = JSON.parse(raw);
    } catch (e) {
        console.warn('无法读取已保存的食谱', e);
    }
}

function persistSavedRecipes() {
    localStorage.setItem('trendchef_saved_recipes', JSON.stringify(state.savedRecipes));
}

function handleSaveRecipe() {
    if (!state.lastRecipe) {
        alert('暂无可保存的食谱，请先生成。');
        return;
    }
    state.savedRecipes.unshift(state.lastRecipe);
    persistSavedRecipes();
    renderCookbook();
    renderProfileGuideline();
    alert('已保存到食谱书！');
}

function hydrateCustomPrefs() {
    const raw = localStorage.getItem('trendchef_custom_prefs');
    if (!raw) return;
    try {
        state.customPrefs = JSON.parse(raw);
    } catch (e) {
        console.warn('无法读取自定义偏好', e);
    }
}

function persistCustomPrefs() {
    localStorage.setItem('trendchef_custom_prefs', JSON.stringify(state.customPrefs));
}

function addCustomPref(label, value) {
    state.customPrefs.push({ label, value });
    persistCustomPrefs();
    renderCustomPrefs();
}

// Simple Mock Report Generator
function generateMockReport(userInput) {
    const date = new Date().toLocaleDateString();
    return `
# 个性化膳食档案报告
*生成日期：${date}*

## 一、用户画像评估
基于您描述的"${userInput.substring(0, 10)}..."，AI评估您可能需要重点关注**心血管健康**与**基础代谢管理**。

## 二、核心膳食建议
1. **控制能量摄入**：建议每日摄入 **1800-2000千卡**。
2. **宏量营养素配比**：
   - 碳水化合物：50-55%（优先选择全谷物）
   - 蛋白质：15-20%（增加鱼虾类摄入）
   - 脂肪：25-30%（限制饱和脂肪酸）

## 三、每日必吃清单
- **谷薯类**：全麦面包、糙米、燕麦（约250g）
- **蔬菜类**：深色蔬菜如菠菜、西兰花（约500g）
- **水果类**：低糖水果如蓝莓、柚子（约200g）
- **优质蛋白**：深海鱼、鸡胸肉、豆腐

## 四、特别叮嘱
> 🌟 **减盐行动**：每日食盐摄入不超过5g，使用低钠盐。
> 💧 **足量饮水**：每日饮水1500-1700ml，提倡饮用白开水或茶水。

---
*本报告基于《中国居民膳食指南（2022）》核心准则生成*
    `;
}

// Simple Markdown Parser for Demo
function markedParse(text) {
    return text
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^\* (.*$)/gim, '<em>$1</em>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
        .replace(/\n/gim, '<br>');
}


function renderInspirations(recipe) {
    const containerId = 'recipeInspirations';
    let container = document.getElementById(containerId);
    
    // 如果没有容器，在 tips 后面创建一个
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = 'recipe-inspirations';
        document.querySelector('.result-content').appendChild(container);
    }

    // 模拟灵感数据
    const inspirations = {
        trending: `当前“${recipe.title}”正在社交平台热议，尝试加入农场自产的<strong>时令香料</strong>，口味层次更丰富！`,
        chips: [
            { label: `魔改：空气炸锅版${recipe.title}`, query: `空气炸锅版 ${recipe.title}` },
            { label: `搭配：当季农场时蔬`, query: `适合搭配 ${recipe.title} 的农场蔬菜` },
            { label: `低脂：${recipe.title}轻盈版`, query: `低脂肪版本的 ${recipe.title}` }
        ]
    };

    container.innerHTML = `
        <div class="ins-header">
            <span class="ins-title">✨ AI 灵感探索</span>
        </div>
        <div class="ins-trending-box">
            <span class="ins-badge">热点</span>
            <p class="ins-trending-text">${inspirations.trending}</p>
        </div>
        <div class="ins-chips-group">
            ${inspirations.chips.map(chip => `
                <button class="ins-chip" data-query="${chip.query}">${chip.label}</button>
            `).join('')}
        </div>
    `;

    // 绑定 Chip 点击事件
    container.querySelectorAll('.ins-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.dataset.query;
            const input = document.getElementById('ingredientInput');
            input.value = query;
            handleGenerate();
            // 滚动到顶部输入框，给用户反馈
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function handleInnovate() {
    // 该功能已移至菜谱详情页的“AI 灵感探索”模块
    console.log('handleInnovate 已废弃');
}

// ===================================
// Cookbook Persistence
// ===================================

function hydrateSavedRecipes() {
    const raw = localStorage.getItem('trendchef_saved_recipes');
    if (!raw) return;
    try {
        state.savedRecipes = JSON.parse(raw);
    } catch (e) {
        console.warn('无法读取已保存的食谱', e);
    }
}

function persistSavedRecipes() {
    localStorage.setItem('trendchef_saved_recipes', JSON.stringify(state.savedRecipes));
}

function handleSaveRecipe() {
    if (!state.lastRecipe) {
        alert('暂无可保存的食谱，请先生成。');
        return;
    }
    state.savedRecipes.unshift(state.lastRecipe);
    persistSavedRecipes();
    renderCookbook();
    alert('已保存到食谱书！');
}

