// ===================================
// TrendChef - Interactive Functionality
// ===================================

// Storage Keys (统一管理，避免不一致)
const STORAGE_KEYS = {
    DIETARY_GUIDELINE: 'trendchef_dietary_guideline',
    SAVED_RECIPES: 'trendchef_saved_recipes'
};

// State Management
const state = {
    currentTab: 'home',
    credits: 3,
    discoveryCategory: 'all',
    discoverySearch: '',
    generatedRecipes: [], // New: Store generated recipes history
    savedRecipes: [],
    lastRecipe: null,
    customPrefs: [],
    isTrendFusionActive: false, // New: 融合热点模式状态
    dietaryGuideline: {
        userInput: '',
        selectedTags: [], // 存储已选的结构化标签
        report: '',
        generatedAt: null,
        isSet: false,
        parsedProfile: null,  // 结构化解析后的用户档案
        dietPlan: null,       // 结构化的膳食建议 (热量、营养素等)
        isEditingStructured: false // 是否处于结构化数据编辑模式
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

/**
 * Generate Recipe (Mock) - 增强版，用于demo展示
 * @param {string} input - User input ingredients
 * @param {boolean} useTrend - Whether to apply trend fusion
 * @returns {object} Recipe data
 */
function generateMockRecipe(input, useTrend = false) {
    const inputLower = input.toLowerCase();
    
    // 根据输入智能匹配菜谱模板
    let recipeTemplate = {
        title: '时蔬糙米能量碗',
        tags: ['低脂', '全谷物', '30分钟'],
        calories: 450,
        time: '25分钟',
        serving: '2人',
        difficulty: '简单',
        image: 'jimeng.png',
        ingredients: [
            '鸡胸肉 150g',
            '藜麦 50g',
            '西兰花 100g',
            '小番茄 50g',
            '橄榄油 5ml'
        ],
        steps: [
            '鸡胸肉切块，用少许盐和黑胡椒腌制15分钟。',
            '平底锅刷少量橄榄油，中小火煎至两面金黄。',
            '藜麦提前浸泡，煮15分钟至熟透。',
            '蔬菜焯水断生，与鸡肉、藜麦混合摆盘。'
        ],
        nutrition: {
            protein: '35g',
            fat: '12g',
            carbs: '45g'
        },
        description: '这就为您推荐一道不仅符合健康标准，且口感丰富的美味料理。搭配了高纤维的蔬菜和优质蛋白，饱腹感强且不给身体造成负担。',
        reason: '根据您的健康需求推荐，高蛋白低碳水配比有助于维持肌肉量同时消耗脂肪。'
    };

    // 根据关键词匹配不同菜谱
    if (inputLower.includes('鸡') || inputLower.includes('鸡肉') || inputLower.includes('鸡胸')) {
        recipeTemplate = {
            title: '香煎鸡胸配藜麦沙拉',
            tags: ['高蛋白', '低脂', '减脂'],
            calories: 420,
            time: '30分钟',
            serving: '2人',
            difficulty: '简单',
            image: 'jimeng.png',
            ingredients: [
                '鸡胸肉 200g',
                '藜麦 80g',
                '混合生菜 150g',
                '小番茄 100g',
                '牛油果 半个',
                '橄榄油 10ml',
                '柠檬汁 适量'
            ],
            steps: [
                '鸡胸肉用刀背拍松，用盐、黑胡椒、蒜蓉腌制20分钟。',
                '平底锅热油，中火煎鸡胸肉，每面3-4分钟至金黄。',
                '藜麦提前浸泡30分钟，加水煮15分钟至熟透，放凉。',
                '混合生菜洗净，小番茄对半切，牛油果切片。',
                '将所有食材混合，淋上橄榄油和柠檬汁，摆盘即可。'
            ],
            nutrition: {
                protein: '42g',
                fat: '15g',
                carbs: '38g'
            },
            description: '高蛋白低脂的完美搭配，鸡胸肉提供优质蛋白，藜麦补充复合碳水，搭配新鲜蔬菜，营养均衡且饱腹感强。',
            reason: '适合减脂塑形人群，高蛋白有助于维持肌肉量，低脂低热量符合减脂需求。'
        };
    } else if (inputLower.includes('鱼') || inputLower.includes('海鲜') || inputLower.includes('鲈鱼')) {
        recipeTemplate = {
            title: '清蒸鲈鱼佐时蔬',
            tags: ['高蛋白', '低脂', '易消化'],
            calories: 380,
            time: '20分钟',
            serving: '2人',
            difficulty: '简单',
            image: 'jimeng.png',
            ingredients: [
                '新鲜鲈鱼 1条（约500g）',
                '姜丝 20g',
                '葱丝 30g',
                '蒸鱼豉油 2勺',
                '西兰花 150g',
                '胡萝卜 50g',
                '橄榄油 5ml'
            ],
            steps: [
                '鲈鱼处理干净，在鱼身两侧各划3刀，方便入味。',
                '盘底铺姜丝，放上鲈鱼，鱼身上再铺姜丝和葱丝。',
                '水开后上锅蒸8-10分钟（根据鱼大小调整）。',
                '蒸好后倒掉盘中多余水分，淋上蒸鱼豉油。',
                '热锅少油，浇在鱼身上，激发出香味。',
                '西兰花和胡萝卜焯水，摆盘即可。'
            ],
            nutrition: {
                protein: '38g',
                fat: '10g',
                carbs: '25g'
            },
            description: '清蒸保留了鱼肉的鲜美和营养，低脂高蛋白，适合各年龄段人群，特别是需要补充优质蛋白的健身人群和老年人。',
            reason: '清蒸烹饪方式最大程度保留营养，低脂高蛋白，富含Omega-3，有益心血管健康。'
        };
    } else if (inputLower.includes('面') || inputLower.includes('面条') || inputLower.includes('拌面')) {
        recipeTemplate = {
            title: '全麦时蔬拌面',
            tags: ['全谷物', '素食', '快手'],
            calories: 480,
            time: '15分钟',
            serving: '2人',
            difficulty: '简单',
            image: 'jimeng.png',
            ingredients: [
                '全麦面条 200g',
                '黄瓜 1根',
                '胡萝卜 1根',
                '豆芽 100g',
                '鸡蛋 2个',
                '芝麻酱 2勺',
                '生抽 1勺',
                '香醋 1勺',
                '蒜泥 适量'
            ],
            steps: [
                '全麦面条煮熟，过凉水沥干备用。',
                '黄瓜、胡萝卜切丝，豆芽焯水30秒。',
                '鸡蛋打散，摊成蛋皮后切丝。',
                '调酱汁：芝麻酱用温水调开，加入生抽、香醋、蒜泥。',
                '将所有食材混合，淋上酱汁拌匀即可。'
            ],
            nutrition: {
                protein: '28g',
                fat: '18g',
                carbs: '55g'
            },
            description: '全麦面条提供复合碳水，搭配新鲜时蔬和优质蛋白，营养均衡。快手简单，适合忙碌的上班族。',
            reason: '全谷物富含膳食纤维，有助于血糖稳定和肠道健康，适合需要控糖的人群。'
        };
    } else if (inputLower.includes('汤') || inputLower.includes('炖') || inputLower.includes('煲')) {
        recipeTemplate = {
            title: '时蔬豆腐汤',
            tags: ['低脂', '素食', '养胃'],
            calories: 280,
            time: '25分钟',
            serving: '2人',
            difficulty: '简单',
            image: 'jimeng.png',
            ingredients: [
                '嫩豆腐 300g',
                '小白菜 200g',
                '香菇 5朵',
                '胡萝卜 50g',
                '高汤 500ml',
                '盐 适量',
                '白胡椒粉 少许',
                '香油 几滴'
            ],
            steps: [
                '豆腐切块，小白菜洗净切段，香菇切片，胡萝卜切丝。',
                '高汤烧开，放入豆腐和香菇，小火煮10分钟。',
                '加入胡萝卜丝煮3分钟。',
                '最后放入小白菜，煮2分钟至断生。',
                '调味：加盐、白胡椒粉，淋几滴香油即可。'
            ],
            nutrition: {
                protein: '22g',
                fat: '8g',
                carbs: '20g'
            },
            description: '清淡养胃的时蔬汤，豆腐提供优质植物蛋白，搭配多种蔬菜，营养丰富且易消化，适合老人和肠胃不适人群。',
            reason: '低脂低热量，富含植物蛋白和膳食纤维，有助于消化和肠道健康。'
        };
    }

    // 如果启用了融合热点，进行全面的差异化改造
    if (useTrend) {
        // 1. 标题差异化：添加热点前缀
        const trendPrefixes = [
            { prefix: '🔥 网红空气炸锅版·', type: 'airfryer', platform: 'TikTok' },
            { prefix: '📱 小红书爆款·', type: 'xiaohongshu', platform: '小红书' },
            { prefix: '✨ TikTok热门·', type: 'tiktok', platform: 'TikTok' },
            { prefix: '🌟 低卡升级版·', type: 'lowcal', platform: '全网' }
        ];
        const selectedTrend = trendPrefixes[Math.floor(Math.random() * trendPrefixes.length)];
        recipeTemplate.title = selectedTrend.prefix + recipeTemplate.title;
        
        // 2. 标签差异化：添加热点标签
        recipeTemplate.tags.push('🔥 网红吃法', '✨ 热点融合');
        if (selectedTrend.type === 'airfryer') {
            recipeTemplate.tags.push('空气炸锅', '低脂升级');
        }
        
        // 3. 营养数据差异化：热点版本通常热量更低、脂肪更少
        if (recipeTemplate.nutrition) {
            const originalCalories = parseInt(recipeTemplate.calories) || 450;
            const originalFat = parseFloat(recipeTemplate.nutrition.fat) || 15;
            
            // 热点版本：热量降低10-15%，脂肪降低30-50%
            recipeTemplate.calories = Math.round(originalCalories * 0.88); // 降低12%
            recipeTemplate.nutrition.fat = (originalFat * 0.6).toFixed(1) + 'g'; // 降低40%
            
            // 添加营养优化说明
            recipeTemplate.nutritionOptimization = {
                caloriesReduction: Math.round(originalCalories - recipeTemplate.calories),
                fatReduction: (originalFat - parseFloat(recipeTemplate.nutrition.fat)).toFixed(1),
                method: '空气炸锅低脂烹饪'
            };
        }
        
        // 4. 烹饪时间差异化：热点版本通常更省时
        if (recipeTemplate.time) {
            const originalTime = parseInt(recipeTemplate.time) || 30;
            recipeTemplate.time = Math.max(originalTime - 5, 15) + '分钟'; // 减少5分钟，最少15分钟
            recipeTemplate.timeNote = '⏰ 比传统方法节省5分钟，无需看管';
        }
        
        // 5. 描述差异化：添加热点融合说明和社交数据
        const socialData = {
            airfryer: { views: '500万+', likes: '10万+', platform: 'TikTok' },
            xiaohongshu: { views: '100万+', likes: '8万+', platform: '小红书' },
            tiktok: { views: '300万+', likes: '6万+', platform: 'TikTok' },
            lowcal: { views: '200万+', likes: '5万+', platform: '全网' }
        };
        const data = socialData[selectedTrend.type] || socialData.airfryer;
        
        recipeTemplate.description = `【🔥 热点融合】结合了当下流行的"${selectedTrend.type === 'airfryer' ? '空气炸锅低脂炸' : '网红烹饪'}"手法，${selectedTrend.platform}播放${data.views}，收藏${data.likes}！口感更酥脆，热量更低，操作更简单。\n\n` + recipeTemplate.description;
        
        // 6. 烹饪步骤差异化：修改关键步骤
        if (recipeTemplate.steps.length > 1) {
            if (selectedTrend.type === 'airfryer') {
                recipeTemplate.steps[1] = '✨ 使用空气炸锅：预热180度，将腌制好的食材放入炸篮，烤15-20分钟，中间翻面一次。无需看管，自动完成，口感更酥脆！';
            } else {
                recipeTemplate.steps[1] = '✨ 采用网红烹饪法：使用新式烹饪工具，操作更简单，效果更佳。';
            }
        }
        
        // 7. 添加热点标识数据（用于UI展示）
        recipeTemplate.trendData = {
            type: selectedTrend.type,
            platform: selectedTrend.platform,
            views: data.views,
            likes: data.likes,
            isHot: true
        };
    }

    // 如果已关联膳食档案，添加个性化建议
    if (state.dietaryGuideline.isSet && state.dietaryGuideline.parsedProfile) {
        const profile = state.dietaryGuideline.parsedProfile;
        if (profile.healthGoals && profile.healthGoals.length > 0) {
            recipeTemplate.reason = `根据您的"${profile.healthGoals[0]}"目标推荐，${recipeTemplate.reason}`;
        }
    }

    return recipeTemplate;
}

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

    // 恢复自动加载已保存的膳食档案
    hydrateGuidelineFromStorage();

    hydrateSavedRecipes();
    renderCookbook();

    // 初始化时更新UI状态
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

    // 融合热点开关监听
    const trendToggle = document.getElementById('trendFusionToggle');
    if (trendToggle) {
        trendToggle.addEventListener('click', () => {
            state.isTrendFusionActive = !state.isTrendFusionActive;
            const statusText = trendToggle.querySelector('.toggle-status');

            if (state.isTrendFusionActive) {
                trendToggle.classList.add('active');
                statusText.textContent = 'ON';
            } else {
                trendToggle.classList.remove('active');
                statusText.textContent = 'OFF';
            }
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
            home: 'AI农庄膳食平台',
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

    // Hide/show header search based on current tab
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
        input.style.borderColor = '#ff6b6b';
        setTimeout(() => {
            input.style.animation = '';
            input.style.borderColor = '';
        }, 500);
        showToast('请输入食材或菜品名称', 'warning');
        return;
    }

    // Show loading state
    const loadingState = document.getElementById('loadingState');
    const loadingText = loadingState.querySelector('.loading-text');
    const recipeResult = document.getElementById('recipeResult');

    loadingState.classList.add('active');
    recipeResult.classList.remove('active');

    // 模拟过程：根据是否开启融合热点和是否关联档案，显示不同的加载步骤
    let loadingSteps = [];
    if (state.isTrendFusionActive && state.dietaryGuideline.isSet) {
        loadingSteps = [
            'AI 正在研读您的膳食档案...',
            '🔥 正在融合当前美食热点...',
            '📱 正在检索TikTok/小红书热门做法...',
            '✨ 正在优化为网红同款...',
            '正在生成个性化热点食谱...'
        ];
    } else if (state.isTrendFusionActive) {
        loadingSteps = [
            'AI 正在分析您的需求...',
            '🔥 正在融合当前美食热点...',
            '📱 正在检索TikTok/小红书热门做法...',
            '✨ 正在优化为网红同款...',
            '正在生成热点食谱...'
        ];
    } else if (state.dietaryGuideline.isSet) {
        loadingSteps = [
            'AI 正在研读您的膳食档案...',
            '正在分析您的健康需求...',
            '正在为您优化健康烹饪方案...',
            '正在生成个性化食谱...'
        ];
    } else {
        loadingSteps = [
            'AI 正在分析您的需求...',
            '正在检索150万+菜谱数据库...',
            '正在匹配最佳食谱...',
            '正在生成专属食谱...'
        ];
    }

    let stepIndex = 0;
    loadingText.textContent = loadingSteps[stepIndex];
    
    const stepInterval = setInterval(() => {
        stepIndex++;
        if (stepIndex < loadingSteps.length) {
            loadingText.textContent = loadingSteps[stepIndex];
        } else {
            clearInterval(stepInterval);
        }
    }, 600);

    // Simulate AI generation (2.5 seconds for better demo effect)
    setTimeout(() => {
        clearInterval(stepInterval);
        loadingState.classList.remove('active');
        const recipe = generateMockRecipe(inputValue, state.isTrendFusionActive);
        state.lastRecipe = recipe;

        // Save to History (Mock)
        state.generatedRecipes.unshift(recipe);

        // Render Result
        renderSpecificRecipe(recipe);
        
        // 显示成功提示
        if (state.isTrendFusionActive && state.dietaryGuideline.isSet) {
            showToast('🔥 已融合热点并优化推荐！', 'success');
        } else if (state.isTrendFusionActive) {
            showToast('🔥 热点融合完成！', 'success');
        } else if (state.dietaryGuideline.isSet) {
            showToast('✨ 已根据您的膳食档案优化推荐', 'success');
        }
    }, 2500);
}

function renderSpecificRecipe(recipe) {
    state.lastRecipe = { ...recipe, savedAt: recipe.savedAt || new Date().toISOString() };

    // Update result card
    document.getElementById('resultImage').src = recipe.image;
    document.getElementById('resultTitle').textContent = recipe.title;
    document.getElementById('resultDescription').textContent = recipe.description;
    // 简化时间显示，去掉冗余说明
    const timeText = recipe.time ? recipe.time.replace(/\s*⏰.*$/, '') : '';
    document.getElementById('resultTime').textContent = timeText;
    document.getElementById('resultServing').textContent = recipe.serving;
    document.getElementById('resultDifficulty').textContent = recipe.difficulty;

    // ==========================================
    // 信息架构优化：融合模式标识 - 顶部展示
    // ==========================================
    const trendBadgeContainer = document.getElementById('resultTrendBadge');
    if (recipe.trendData && recipe.trendData.isHot) {
        const trend = recipe.trendData;
        const caloriesReduction = recipe.nutritionOptimization ? recipe.nutritionOptimization.caloriesReduction : 0;
        const reductionPercent = recipe.nutritionOptimization ? 
            ((caloriesReduction / (parseInt(recipe.calories) + caloriesReduction) * 100).toFixed(0)) : 0;
        
        trendBadgeContainer.style.display = 'block';
        trendBadgeContainer.innerHTML = `
            <div class="trend-badge-compact">
                <div class="trend-badge-header">
                    <span class="trend-icon">🔥</span>
                    <span class="trend-label">热点融合</span>
                </div>
                <div class="trend-badge-data">
                    <span class="trend-item">${trend.views}</span>
                    <span class="trend-item">${trend.likes}</span>
                    ${caloriesReduction > 0 ? `<span class="trend-item highlight">↓${reductionPercent}%</span>` : ''}
                </div>
            </div>
        `;
    } else {
        trendBadgeContainer.style.display = 'none';
    }

    // Update steps - 简化标题
    const stepsContainer = document.getElementById('resultSteps');
    stepsContainer.innerHTML = '<h4>步骤</h4><ol>' +
        recipe.steps.map(step => `<li>${step}</li>`).join('') +
        '</ol>';

    // ==========================================
    // 信息架构优化：AI膳食优化建议 - 步骤后展示
    // ==========================================
    const aiOptimizationContainer = document.getElementById('resultAIOptimization');
    if (state.dietaryGuideline.isSet) {
        aiOptimizationContainer.style.display = 'block';
        aiOptimizationContainer.innerHTML = `
            <div class="dietary-optimization-note">
                <div class="opt-header">
                    <span>AI优化</span>
                </div>
                <p>已根据您的健康档案优化烹饪方案，调整了油脂比例和营养配比。</p>
            </div>
        `;
    } else {
        aiOptimizationContainer.style.display = 'none';
    }

    // 删除AI灵感探索模块 - 功能重复，信息过载
    // 用户如需变体，可直接修改输入框重新生成，或使用"融合热点"开关

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
    // 隐藏 Feed 列表，显示详情页
    const feedContainer = document.getElementById('discoveryFeedContainer');
    const detailPage = document.getElementById('discoveryDetail');
    const headerTitle = document.getElementById('headerTitle');
    const headerCategoryTabs = document.getElementById('headerCategoryTabs');

    if (feedContainer) feedContainer.style.display = 'none';
    if (detailPage) detailPage.style.display = 'block';
    
    // 隐藏 Header 中的分类 Tab
    if (headerCategoryTabs) headerCategoryTabs.style.display = 'none';
    if (headerTitle) headerTitle.textContent = '详情'; // 临时修改标题

    // 填充详情数据
    document.getElementById('detailImage').src = recipe.image;
    document.getElementById('detailTitle').textContent = recipe.title;
    
    // 价格处理
    const priceEl = document.getElementById('detailPrice');
    const unitEl = document.getElementById('detailUnit');
    if (recipe.price) {
        priceEl.textContent = '¥' + recipe.price;
        unitEl.textContent = '/份'; // 默认单位
        priceEl.parentNode.style.display = 'flex';
    } else {
        priceEl.parentNode.style.display = 'none';
    }

    // Tags
    const tagsContainer = document.getElementById('detailTags');
    tagsContainer.innerHTML = '';
    const platformTag = document.createElement('span');
    platformTag.className = 'detail-tag';
    platformTag.textContent = recipe.platform;
    tagsContainer.appendChild(platformTag);
    
    if (recipe.highlight) {
        const highlightTag = document.createElement('span');
        highlightTag.className = 'detail-tag';
        highlightTag.textContent = recipe.highlight;
        tagsContainer.appendChild(highlightTag);
    }

    // 卖家信息 (Mock)
    document.getElementById('sellerName').textContent = recipe.platform + '认证农户';
    document.getElementById('sellerType').textContent = '实名认证';
    
    // 描述
    document.getElementById('detailDesc').textContent = recipe.desc || recipe.description || '暂无详细介绍';

    // 地址 (Mock)
    document.getElementById('detailLocation').textContent = '浙江省杭州市余杭区良渚街道良渚文化村';

    // 绑定返回按钮
    const backBtn = document.getElementById('discoveryBackBtn');
    backBtn.onclick = () => {
        detailPage.style.display = 'none';
        feedContainer.style.display = 'block';
        if (headerCategoryTabs) headerCategoryTabs.style.display = 'flex'; // 恢复显示
        if (headerTitle) headerTitle.textContent = '发现'; // 恢复标题
    };

    // 绑定底部按钮
    document.getElementById('navToFarmBtn').onclick = () => {
        alert('正在打开地图导航前往农场...');
    };
    
    document.getElementById('contactSellerBtnMain').onclick = () => {
        alert('正在联系卖家：' + recipe.platform);
    };
    document.getElementById('contactSellerBtnSmall').onclick = () => {
        alert('正在联系卖家：' + recipe.platform);
    };
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
// 用户档案解析函数
// ===================================

/**
 * 从用户输入文本中解析结构化档案信息
 * @param {string} text - 用户输入的描述文本
 * @returns {object} - 结构化的用户档案
 */
function parseUserProfile(text) {
    const profile = {
        age: null,
        gender: null,
        height: null,
        weight: null,
        bmi: null,
        bmiStatus: null,
        chronicDiseases: [],
        healthGoals: [],
        dietaryRestrictions: [],
        lifestyle: null
    };

    if (!text) return profile;

    // 解析年龄
    const ageMatch = text.match(/(\d{1,3})\s*岁/);
    if (ageMatch) {
        profile.age = parseInt(ageMatch[1], 10);
    }

    // 解析性别
    if (text.includes('男') || text.includes('男性')) {
        profile.gender = '男';
    } else if (text.includes('女') || text.includes('女性')) {
        profile.gender = '女';
    }

    // 解析身高 (cm)
    const heightMatch = text.match(/身高\s*[:：]?\s*(\d{2,3})\s*(cm|厘米)?/i) ||
        text.match(/(\d{3})\s*cm/i) ||
        text.match(/(\d{2,3})\s*厘米/);
    if (heightMatch) {
        profile.height = parseInt(heightMatch[1], 10);
    }

    // 解析体重 (kg)
    const weightMatch = text.match(/体重\s*[:：]?\s*(\d{2,3})\s*(kg|公斤|斤)?/i) ||
        text.match(/(\d{2,3})\s*kg/i) ||
        text.match(/(\d{2,3})\s*公斤/);
    if (weightMatch) {
        profile.weight = parseInt(weightMatch[1], 10);
    }

    // 计算BMI
    if (profile.height && profile.weight) {
        const heightInM = profile.height / 100;
        profile.bmi = (profile.weight / (heightInM * heightInM)).toFixed(1);

        // BMI状态判断
        const bmiVal = parseFloat(profile.bmi);
        if (bmiVal < 18.5) {
            profile.bmiStatus = '偏瘦';
        } else if (bmiVal < 24) {
            profile.bmiStatus = '正常';
        } else if (bmiVal < 28) {
            profile.bmiStatus = '超重';
        } else {
            profile.bmiStatus = '肥胖';
        }
    }

    // 解析慢性病
    const chronicKeywords = [
        '高血压', '高血脂', '高血糖', '糖尿病', '心脏病', '冠心病',
        '脂肪肝', '痛风', '胃病', '胃炎', '胃溃疡', '肾病', '肝病',
        '甲状腺', '骨质疏松', '关节炎', '哮喘', '贫血', '失眠'
    ];
    chronicKeywords.forEach(keyword => {
        if (text.includes(keyword) && !profile.chronicDiseases.includes(keyword)) {
            profile.chronicDiseases.push(keyword);
        }
    });

    // 解析健康目标
    const goalKeywords = [
        { match: ['减脂', '减肥', '瘦身', '降体重'], label: '减脂塑形' },
        { match: ['控糖', '降血糖', '控制血糖'], label: '控糖管理' },
        { match: ['控血压', '降血压', '控制血压'], label: '控制血压' },
        { match: ['降血脂', '控血脂'], label: '降血脂' },
        { match: ['增肌', '增重', '增加体重'], label: '增肌增重' },
        { match: ['养胃', '调理肠胃', '肠胃'], label: '养胃护胃' },
        { match: ['护肝', '养肝'], label: '护肝养肝' },
        { match: ['改善睡眠', '助眠', '睡眠'], label: '改善睡眠' },
        { match: ['补钙', '骨骼'], label: '补钙强骨' },
        { match: ['美容', '皮肤', '抗衰'], label: '美容养颜' }
    ];
    goalKeywords.forEach(goal => {
        if (goal.match.some(m => text.includes(m)) && !profile.healthGoals.includes(goal.label)) {
            profile.healthGoals.push(goal.label);
        }
    });

    // 从慢性病推断健康目标
    if (profile.chronicDiseases.includes('高血压') && !profile.healthGoals.includes('控制血压')) {
        profile.healthGoals.push('控制血压');
    }
    if (profile.chronicDiseases.includes('高血脂') && !profile.healthGoals.includes('降血脂')) {
        profile.healthGoals.push('降血脂');
    }
    if ((profile.chronicDiseases.includes('糖尿病') || profile.chronicDiseases.includes('高血糖'))
        && !profile.healthGoals.includes('控糖管理')) {
        profile.healthGoals.push('控糖管理');
    }

    // 解析饮食禁忌
    const restrictionPatterns = [
        { pattern: /过敏\s*[:：]?\s*([^，。,\.]+)/g, prefix: '过敏：' },
        { pattern: /不[能吃喝]([^，。,\.]+)/g, prefix: '' },
        { pattern: /忌([^，。,\.]+)/g, prefix: '' },
        { pattern: /对([^，。,\.]+)过敏/g, prefix: '过敏：' }
    ];

    const restrictionKeywords = [
        '海鲜', '花生', '牛奶', '鸡蛋', '大豆', '小麦', '坚果', '鱼', '虾', '蟹',
        '辛辣', '油腻', '生冷', '酒', '咖啡', '浓茶', '高盐食物', '油炸食品',
        '甜食', '糖', '肥肉', '内脏'
    ];

    restrictionKeywords.forEach(keyword => {
        if (text.includes(keyword) &&
            (text.includes('不能') || text.includes('不吃') || text.includes('过敏') ||
                text.includes('忌') || text.includes('禁') || text.includes('避免'))) {
            if (!profile.dietaryRestrictions.some(r => r.includes(keyword))) {
                profile.dietaryRestrictions.push(keyword);
            }
        }
    });

    // 解析生活方式
    const lifestyleKeywords = [];
    if (text.includes('久坐') || text.includes('办公')) {
        lifestyleKeywords.push('久坐办公');
    }
    if (text.includes('运动少') || text.includes('不运动') || text.includes('运动不足')) {
        lifestyleKeywords.push('运动不足');
    }
    if (text.includes('经常运动') || text.includes('爱运动') || text.includes('健身')) {
        lifestyleKeywords.push('经常运动');
    }
    if (text.includes('压力大') || text.includes('工作忙')) {
        lifestyleKeywords.push('压力较大');
    }
    if (lifestyleKeywords.length > 0) {
        profile.lifestyle = lifestyleKeywords.join('、');
    }

    // ==========================================
    // 模拟兜底：如果提取信息过少，AI 自动补全默认画像
    // ==========================================
    const hasKeyData = profile.age || profile.gender || profile.bmi ||
        profile.healthGoals.length > 0 || profile.chronicDiseases.length > 0;

    if (!hasKeyData) {
        // AI Simulation Defaults
        profile.healthGoals.push('健康膳食', '增强免疫');
        profile.lifestyle = profile.lifestyle || '常规生活方式';

        // 模拟更完整的画像，避免显示为空
        profile.age = '30-40'; // AI 预设区间
        profile.gender = '通用';
        profile.bmiStatus = '标准保持';
        // 尝试从简短输入中猜测，如果实在没有，就不硬塞年龄性别以免误导，
        // 但赋予它“健康维持”的目标，确保卡片渲染。
        // 或者我们可以标记这是一个“通用健康档案”
    }

    return profile;
}

/**
 * 生成报告头部的结构化摘要
 */
function renderReportHeaderSummary(parsed) {
    const container = document.getElementById('reportHeaderSummary');
    if (!container) return;

    let html = '';

    // Age & Gender
    if (parsed.age || parsed.gender) {
        html += `<span class="summary-chip highlight">${parsed.age || ''} ${parsed.gender || ''}</span>`;
    }

    // BMI
    if (parsed.bmi) {
        html += `<span class="summary-chip">BMI: ${parsed.bmi}</span>`;
    }

    // Goal
    if (parsed.healthGoals && parsed.healthGoals.length > 0) {
        html += `<span class="summary-chip highlight">🎯 ${parsed.healthGoals.join('、')}</span>`;
    }

    // Diseases
    if (parsed.chronicDiseases && parsed.chronicDiseases.length > 0) {
        parsed.chronicDiseases.forEach(d => {
            html += `<span class="summary-chip" style="color:#ff6b6b; background:rgba(255,107,107,0.1)">⚠️ ${d}</span>`;
        });
    }

    container.innerHTML = html;
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

    // Bind listeners
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    if (promptBtn) promptBtn.addEventListener('click', openModal);

    // 增强首页提示条交互：点击提示条也可打开档案
    const hintBar = document.getElementById('guidelineHint');
    if (hintBar) {
        hintBar.addEventListener('click', openModal);
    }

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

/**
 * 重置演示状态的逻辑封装
 */
function resetDietaryGuidelineDemo() {
    if (confirm('是否重置演示状态？这会清空您的膳食档案并重新显示欢迎引导。')) {
        localStorage.removeItem(STORAGE_KEYS.DIETARY_GUIDELINE);
        state.dietaryGuideline = {
            userInput: '',
            selectedTags: [],
            report: '',
            generatedAt: null,
            isSet: false,
            parsedProfile: null,
            dietPlan: null,
            isEditingStructured: false
        };
        updateGuidelineUI();
        checkFirstVisit(); // 重新触发欢迎弹窗
        // 使用更友好的提示方式
        showToast('演示状态已重置！', 'success');
    }
}

/**
 * 为动态生成的重置按钮绑定事件
 */
function bindResetDemoListener() {
    const resetBtn = document.getElementById('resetDemoBtn');
    if (resetBtn) {
        resetBtn.onclick = (e) => {
            e.stopPropagation();
            resetDietaryGuidelineDemo();
        };
    }
}

function checkFirstVisit() {
    const welcomeModal = document.getElementById('welcomeModal');
    const hasSeenWelcome = localStorage.getItem('trendchef_has_seen_welcome');

    // 如果已经看过欢迎页且已设置档案，不显示
    if (hasSeenWelcome && state.dietaryGuideline.isSet) {
        return;
    }

    if (welcomeModal) {
        // 延迟显示，让页面先加载完成
        setTimeout(() => {
        welcomeModal.style.display = 'flex';
            welcomeModal.classList.add('show');
        }, 300);

        // Handle Welcome Actions
        const generateBtn = document.getElementById('welcomeGenerateBtn');
        const skipBtn = document.getElementById('welcomeSkipBtn');

        if (generateBtn) {
            // 移除旧的事件监听器，避免重复绑定
            const newGenerateBtn = generateBtn.cloneNode(true);
            generateBtn.parentNode.replaceChild(newGenerateBtn, generateBtn);
            
            newGenerateBtn.addEventListener('click', () => {
                welcomeModal.classList.remove('show');
                setTimeout(() => {
            welcomeModal.style.display = 'none';
                    openGuidelineModal('edit');
                }, 300);
                localStorage.setItem('trendchef_has_seen_welcome', 'true');
            });
        }

        if (skipBtn) {
            const newSkipBtn = skipBtn.cloneNode(true);
            skipBtn.parentNode.replaceChild(newSkipBtn, skipBtn);
            
            newSkipBtn.addEventListener('click', () => {
                welcomeModal.classList.remove('show');
                setTimeout(() => {
            welcomeModal.style.display = 'none';
            // Force show prompt if not set
            if (!state.dietaryGuideline.isSet) {
                const prompt = document.getElementById('guidelinePrompt');
                        if (prompt) {
                            prompt.style.display = 'flex';
                            // 添加淡入动画
                            setTimeout(() => prompt.style.opacity = '1', 10);
                        }
            }
            updateGuidelineUI();
                }, 300);
                localStorage.setItem('trendchef_has_seen_welcome', 'true');
        });
        }
    }
}

function handleGenerateGuideline() {
    // 1. 获取选中的标签
    const selectedTags = Array.from(document.querySelectorAll('.quick-tag-chip.active'))
        .map(tag => tag.dataset.text);
    
    // 2. 获取补充文本
    const input = document.getElementById('dietaryInput').value.trim();
    
    // 3. 合并输入 (逻辑：标签 + 补充文本)
    let finalInput = selectedTags.join('，');
    if (input) {
        finalInput += (finalInput ? '。补充信息：' : '') + input;
    }

    // 验证逻辑：总内容不能为空，且如果只有标签，至少选一个；如果只有文本，至少5个字
    if (!finalInput || (selectedTags.length === 0 && input.length < 5)) {
        showToast('请至少选择一个标签或输入简单的描述', 'warning');
        return;
    }

    // 保存到 State (Separate storage)
    state.dietaryGuideline.selectedTags = selectedTags;
    state.dietaryGuideline.userInput = input; // 只保存用户手写的补充部分
    // 注意：generateMockReport 需要完整的语义文本
    // 解析用户输入，生成结构化档案 (使用合并后的文本)
    state.dietaryGuideline.parsedProfile = parseUserProfile(finalInput);

    // Switch to Loading
    document.getElementById('dietaryInputStep').style.display = 'none';
    const loadingEl = document.getElementById('dietaryLoading');
    loadingEl.style.display = 'flex';

    // Simulate AI API Call with Stepped Loading
    const steps = [
        { id: 'loadStep1', delay: 0 },
        { id: 'loadStep2', delay: 1000 },
        { id: 'loadStep3', delay: 2000 }
    ];

    steps.forEach(step => {
        setTimeout(() => {
            document.querySelectorAll('.loading-step').forEach(el => el.classList.remove('active'));
            const el = document.getElementById(step.id);
            if (el) el.classList.add('active');
        }, step.delay);
    });

    setTimeout(() => {
        const result = generateMockReport(finalInput); // 使用合并后的完整文本生成报告
        
        // 暂存到 State (但在点击保存前不视为正式生效)
        // 注意：这里直接修改了 state，意味着如果用户关闭弹窗不保存，内存中的 state 也是新的。
        // 但只要不 persist，刷新后会恢复。为了 Demo 简单，我们接受这个副作用。
        state.dietaryGuideline.report = result.report;
        state.dietaryGuideline.dietPlan = result.plan;
        state.dietaryGuideline.generatedAt = new Date().toISOString();
        // 标记 parsedProfile
        state.dietaryGuideline.parsedProfile = state.dietaryGuideline.parsedProfile || parseUserProfile(finalInput);

        // Render Report
        loadingEl.style.display = 'none';
        const reportStep = document.getElementById('dietaryReportStep');
        reportStep.style.display = 'flex';
        document.getElementById('dietaryReportContent').innerHTML = markedParse(result.report);

        // 更新按钮状态 - 显示"保存档案"
        const saveBtn = document.getElementById('saveGuidelineBtn');
        if (saveBtn) {
            saveBtn.textContent = '保存档案';
            saveBtn.classList.remove('saved');
        }

        // 渲染头部摘要
        if (state.dietaryGuideline.parsedProfile) {
            renderReportHeaderSummary(state.dietaryGuideline.parsedProfile);
        }

    }, 3000); // Increased to accommodate steps
}

function saveGuideline() {
    state.dietaryGuideline.isSet = true;
    persistGuideline();
    
    // 更新 UI 状态
    updateGuidelineUI();

    // 更新按钮状态
    const saveBtn = document.getElementById('saveGuidelineBtn');
    if (saveBtn) {
        saveBtn.textContent = '已保存';
        saveBtn.classList.add('saved');
    }

    // 延迟关闭，给用户反馈
    setTimeout(() => {
    document.getElementById('dietaryModal').classList.remove('active');
        showToast('膳食档案已保存', 'success');
    }, 500);
}

function updateGuidelineUI() {
    const hint = document.getElementById('guidelineHint');
    const prompt = document.getElementById('guidelinePrompt');
    const previewCard = document.getElementById('profileGuidelineCard'); // Assuming this is the card that shows the guideline preview

    if (state.dietaryGuideline.isSet) {
        if (hint) {
            hint.classList.add('active');
            // 添加淡入动画
            setTimeout(() => hint.style.opacity = '1', 10);
        }
        if (prompt) {
            prompt.style.display = 'none';
            prompt.style.opacity = '0';
        }
        renderCookbook();
        renderProfileGuideline();
    } else {
        // Reset states
        if (hint) {
            hint.classList.remove('active');
            hint.style.opacity = '0';
        }
        if (prompt) {
            prompt.style.display = 'flex';
            // 添加淡入动画
            setTimeout(() => {
                prompt.style.opacity = '1';
                prompt.style.transform = 'translateY(0)';
            }, 10);
        }
        if (previewCard) previewCard.style.display = 'none';

        // Show empty guideline in profile tab if needed (handled in renderProfileGuideline)
    }
}

function checkGuidelineState() {
    const inputStep = document.getElementById('dietaryInputStep');
    const reportStep = document.getElementById('dietaryReportStep');
    const reportContent = document.getElementById('dietaryReportContent');
    const saveBtn = document.getElementById('saveGuidelineBtn');

    if (state.dietaryGuideline.isSet && state.dietaryGuideline.report) {
        if (inputStep) inputStep.style.display = 'none';

        // Enhanced Loading State Check could go here

        if (reportStep) reportStep.style.display = 'flex';

        if (reportContent) {
            // 解析Markdown并渲染
            // 使用markedParse函数解析markdown
            let html = markedParse(state.dietaryGuideline.report);
            reportContent.innerHTML = html;
        }

        // 渲染头部摘要
        if (state.dietaryGuideline.parsedProfile) {
            renderReportHeaderSummary(state.dietaryGuideline.parsedProfile);
        }

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
        if (inputStep) inputStep.style.display = 'flex';
        if (reportStep) reportStep.style.display = 'none';

        // 重置按钮状态
        if (saveBtn) {
            saveBtn.textContent = '保存';
            saveBtn.classList.remove('saved');
        }
    }
}

function hydrateGuidelineFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEYS.DIETARY_GUIDELINE);
    if (!raw) return;
    try {
        const parsed = JSON.parse(raw);
        // 合并时保留 isSet 状态，如果有parsedProfile/dietPlan则一并恢复
        state.dietaryGuideline = { ...state.dietaryGuideline, ...parsed, isSet: true };
        updateGuidelineUI();
    } catch (err) {
        console.warn('无法读取已保存的膳食档案', err);
    }
}

function persistGuideline() {
    localStorage.setItem(STORAGE_KEYS.DIETARY_GUIDELINE, JSON.stringify(state.dietaryGuideline));
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
                <img src="jimeng.png" alt="${item.title}">
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

            // 初始化快捷标签监听
            setupQuickTagsListeners(textarea);
        }
    } else {
        // 查看模式：显示已生成的报告
        checkGuidelineState();
    }
}

let quickTagsInputHandler = null;

function setupQuickTagsListeners(textarea) {
    const tags = document.querySelectorAll('.quick-tag-chip');
    
    tags.forEach(tag => {
        // Remove old listener to avoid duplicates if re-inited
        const newTag = tag.cloneNode(true);
        tag.parentNode.replaceChild(newTag, tag);

        newTag.addEventListener('click', (e) => {
            // 只切换自身状态，不修改 textarea
            e.target.classList.toggle('active');
            
            // 添加点击反馈动画
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        });

        // Init active state based on saved state
        const tagText = newTag.dataset.text;
        if (state.dietaryGuideline.selectedTags && state.dietaryGuideline.selectedTags.includes(tagText)) {
            newTag.classList.add('active');
            } else {
            newTag.classList.remove('active');
        }
    });
    
    // 移除之前的 input listener，不再需要双向同步
    if (quickTagsInputHandler) {
        textarea.removeEventListener('input', quickTagsInputHandler);
        quickTagsInputHandler = null;
    }
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

        // 获取解析后的结构化档案
        const profile = state.dietaryGuideline.parsedProfile;

        // 只要 isSet 为 true，就视为已配置，不再回退到 Empty 状态
        // 即使解析出的字段很少，也显示一个基础卡片
        let profileHtml = '';
        if (profile && (profile.age || profile.gender || profile.chronicDiseases.length > 0 || profile.healthGoals.length > 0)) {
            profileHtml = renderStructuredProfile(profile);
        } else {
            // Fallback for sparse data
            profileHtml = `
                <div class="structured-profile-list">
                    <div class="profile-row">
                        <span class="profile-label">我的目标</span>
                        <span class="profile-value">健康饮食</span>
                    </div>
                     <div class="profile-row">
                        <span class="profile-label">定制需求</span>
                        <span class="profile-value">${state.dietaryGuideline.userInput || 'AI 个性化定制'}</span>
                    </div>
                </div>
            `;
        }
        guidelinePreview.innerHTML = profileHtml;

        setupStructuredEditListeners();

        // 调整 Card Title
        const cardHeader = card.querySelector('.guideline-card-title');

        // 我们利用 action 区域放 "编辑 / 保存" 按钮
        if (actionsContainer) {
            const isEditing = state.dietaryGuideline.isEditingStructured;
            actionsContainer.innerHTML = `
                <button class="action-btn primary" id="toggleEditProfileBtn">
                    ${isEditing ? '💾 保存修改' : '✏️ 调整数据'}
                </button>
                ${!isEditing ? `<button class="action-btn secondary" onclick="openGuidelineModal()">📋 完整档案</button>` : ''}
                <button class="action-btn" id="resetDemoBtn" style="font-size: 10px; opacity: 0.1; border: none; background: transparent; padding: 2px; min-width: auto; margin-left: 4px;" title="重置演示">↺</button>
            `;

            // 绑定切换按钮事件
            const toggleBtn = document.getElementById('toggleEditProfileBtn');
            if (toggleBtn) {
                // 移除旧的事件监听器
                const newToggleBtn = toggleBtn.cloneNode(true);
                toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
                
                newToggleBtn.addEventListener('click', () => {
                if (isEditing) {
                        // 保存时重新计算BMI（如果修改了身高体重）
                        const profile = state.dietaryGuideline.parsedProfile;
                        if (profile && profile.height && profile.weight) {
                            const heightInM = profile.height / 100;
                            profile.bmi = (profile.weight / (heightInM * heightInM)).toFixed(1);
                            const bmiVal = parseFloat(profile.bmi);
                            if (bmiVal < 18.5) {
                                profile.bmiStatus = '偏瘦';
                            } else if (bmiVal < 24) {
                                profile.bmiStatus = '正常';
                            } else if (bmiVal < 28) {
                                profile.bmiStatus = '超重';
                            } else {
                                profile.bmiStatus = '肥胖';
                            }
                        }
                    state.dietaryGuideline.isEditingStructured = false;
                    persistGuideline();
                        showToast('档案已保存', 'success');
                } else {
                    state.dietaryGuideline.isEditingStructured = true;
                }
                renderProfileGuideline();
            });
            }

            // 绑定重置按钮 (动态生成后)
            bindResetDemoListener();
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
                    <button class="action-btn primary" style="flex: 1; justify-content: center;" onclick="openGuidelineModal()">立即建立档案</button>
                    <button class="action-btn" id="resetDemoBtn" style="font-size: 10px; opacity: 0.1; border: none; background: transparent; padding: 2px; min-width: auto; margin-left: 4px;" title="重置演示">↺</button>
                `;
            bindResetDemoListener();
        }
    }
}



/**
 * 渲染结构化用户档案 - 简洁列表模式 (支持编辑)
 */
function renderStructuredProfile(profile) {
    const isEditing = state.dietaryGuideline.isEditingStructured;
    const plan = state.dietaryGuideline.dietPlan || {};

    // Helper to generate a row
    const renderRow = (label, value, key, group, type = 'text') => {
        let displayVal = value || '';
        let inputHtml = '';

        if (isEditing) {
            inputHtml = `<input type="${type}" class="profile-edit-input" data-group="${group}" data-key="${key}" value="${displayVal}" />`;
        } else {
            inputHtml = `<span class="profile-list-value">${displayVal || '-'}</span>`;
        }

        return `
            <div class="profile-list-item">
                <span class="profile-list-label">${label}</span>
                ${inputHtml}
            </div>
        `;
    };

    let html = '<div class="profile-structured-list">';

    // --- 1. 膳食方案 (可编辑) ---
    if (plan || isEditing) {
        html += `<div class="list-section-header">膳食建议</div>`;
        html += renderRow('🔥 每日热量', plan.calories, 'calories', 'plan');
        html += renderRow('🌾 碳水', plan.carbs, 'carbs', 'plan');
        html += renderRow('🥩 蛋白质', plan.protein, 'protein', 'plan');
        html += renderRow('🥑 脂肪', plan.fat, 'fat', 'plan');
    }

    // --- 2. 身体数据 (可编辑) ---
    html += `<div class="list-section-header" style="margin-top:1rem;">身体档案</div>`;
    html += renderRow('🎂 年龄', profile.age ? profile.age + '岁' : '', 'age', 'profile');
    html += renderRow('📏 身高', profile.height ? profile.height + 'cm' : '', 'height', 'profile');
    html += renderRow('⚖️ 体重', profile.weight ? profile.weight + 'kg' : '', 'weight', 'profile');

    // BMI 自动计算，不可直接编辑，或者编辑身高体重后自动变？这里简单起见允许覆盖或者显示
    // 如果是编辑模式，显示提示 "据身高体重自动计算" 或者允许微调
    if (!isEditing) {
        html += `
            <div class="profile-list-item">
                <span class="profile-list-label">📊 BMI</span>
                <span class="profile-list-value">
                    ${profile.bmi || '-'}
                    <span class="bmi-tag ${getBmiClass(profile.bmiStatus)}">${profile.bmiStatus || ''}</span>
                </span>
            </div>
        `;
    }

    // --- 3. 标签类 (健康状况、目标) ---
    // 编辑模式下暂时用类似 Tag Input 的纯文本处理，或者简化为逗号分隔字符串
    const chronicStr = (profile.chronicDiseases || []).join('、');
    const goalStr = (profile.healthGoals || []).join('、');
    const restrictStr = (profile.dietaryRestrictions || []).join('、');

    html += renderRow('🩺 健康状况', chronicStr, 'chronicDiseases', 'profile');
    html += renderRow('🎯 健康目标', goalStr, 'healthGoals', 'profile');
    html += renderRow('⚠️ 饮食禁忌', restrictStr, 'dietaryRestrictions', 'profile');

    html += '</div>';
    return html;
}

function setupStructuredEditListeners() {
    if (!state.dietaryGuideline.isEditingStructured) return;

    const inputs = document.querySelectorAll('.profile-edit-input');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const group = e.target.dataset.group;
            const key = e.target.dataset.key;
            const val = e.target.value;

            if (group === 'plan') {
                if (!state.dietaryGuideline.dietPlan) state.dietaryGuideline.dietPlan = {};
                state.dietaryGuideline.dietPlan[key] = val;
            } else if (group === 'profile') {
                // 特殊处理数组类型的字段
                if (['chronicDiseases', 'healthGoals', 'dietaryRestrictions'].includes(key)) {
                    state.dietaryGuideline.parsedProfile[key] = val.split(/[,、，]/).map(s => s.trim()).filter(s => s);
                } else if (key === 'age' || key === 'height' || key === 'weight') {
                    // 去除非数字字符保存
                    const num = parseInt(val.replace(/[^\d]/g, ''));
                    state.dietaryGuideline.parsedProfile[key] = isNaN(num) ? val : num;
                } else {
                    state.dietaryGuideline.parsedProfile[key] = val;
                }
            }
        });
    });
}

/**
 * 根据BMI状态返回对应的CSS类名
 */
function getBmiClass(status) {
    switch (status) {
        case '偏瘦': return 'bmi-underweight';
        case '正常': return 'bmi-normal';
        case '超重': return 'bmi-overweight';
        case '肥胖': return 'bmi-obese';
        default: return '';
    }
}

function buildGuidelineSnippet(text, maxLen) {
    const clean = text || '';
    if (clean.length <= maxLen) return clean;
    return clean.slice(0, maxLen) + '...';
}


function hydrateSavedRecipes() {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_RECIPES);
    if (!raw) return;
    try {
        state.savedRecipes = JSON.parse(raw);
    } catch (e) {
        console.warn('无法读取已保存的食谱', e);
    }
}

function persistSavedRecipes() {
    localStorage.setItem(STORAGE_KEYS.SAVED_RECIPES, JSON.stringify(state.savedRecipes));
}

function handleSaveRecipe() {
    if (!state.lastRecipe) {
        showToast('暂无可保存的食谱，请先生成。', 'warning');
        return;
    }
    state.savedRecipes.unshift(state.lastRecipe);
    persistSavedRecipes();
    renderCookbook();
    renderProfileGuideline();
    showToast('已保存到食谱书！', 'success');
}



// Simple Mock Report Generator (增强版，用于demo展示)
function generateMockReport(userInput) {
    const date = new Date().toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // 智能识别用户需求，生成更精准的建议
    const inputLower = userInput.toLowerCase();
    let plan = {
        calories: '1800-2000',
        carbs: '50-55%',
        protein: '15-20%',
        fat: '25-30%',
        adviceTags: ['均衡营养', '适量运动']
    };

    // 根据关键词调整方案
    if (inputLower.includes('减肥') || inputLower.includes('减脂') || inputLower.includes('瘦身')) {
        plan.calories = '1500-1700';
        plan.carbs = '45-50%';
        plan.protein = '25-30%';
        plan.fat = '20-25%';
        plan.adviceTags = ['高蛋白', '低GI', '热量缺口', '有氧运动'];
    } else if (inputLower.includes('增肌') || inputLower.includes('增重')) {
        plan.calories = '2200-2500';
        plan.carbs = '45-50%';
        plan.protein = '25-30%';
        plan.fat = '20-25%';
        plan.adviceTags = ['高蛋白', '复合碳水', '力量训练'];
    } else if (inputLower.includes('控糖') || inputLower.includes('糖尿病') || inputLower.includes('高血糖')) {
        plan.calories = '1600-1800';
        plan.carbs = '40-45%';
        plan.protein = '20-25%';
        plan.fat = '25-30%';
        plan.adviceTags = ['低GI', '控糖', '定时定量', '监测血糖'];
    } else if (inputLower.includes('高血压') || inputLower.includes('控血压')) {
        plan.calories = '1800-2000';
        plan.carbs = '50-55%';
        plan.protein = '15-20%';
        plan.fat = '25-30%';
        plan.adviceTags = ['低钠', '高钾', 'DASH饮食', '限酒'];
    } else if (inputLower.includes('老人') || inputLower.includes('老年') || inputLower.includes('康养')) {
        plan.calories = '1600-1800';
        plan.carbs = '50-55%';
        plan.protein = '18-22%';
        plan.fat = '25-30%';
        plan.adviceTags = ['易消化', '补钙', '防跌倒', '适量运动'];
    } else if (inputLower.includes('儿童') || inputLower.includes('孩子') || inputLower.includes('成长')) {
        plan.calories = '1400-1800';
        plan.carbs = '50-55%';
        plan.protein = '15-20%';
        plan.fat = '25-30%';
        plan.adviceTags = ['均衡营养', '多样化', '少零食', '充足睡眠'];
    }

    // 生成个性化报告
    const report = `
# 个性化膳食档案报告
*生成日期：${date}*

## 一、用户画像评估
基于您描述的"${userInput.substring(0, 30)}${userInput.length > 30 ? '...' : ''}"，AI智能分析您的健康需求，为您定制专属膳食方案。

**核心关注点**：
${plan.adviceTags.map(tag => `- ${tag}`).join('\n')}

## 二、核心膳食建议

### 1. 能量摄入控制
建议每日摄入 **${plan.calories}千卡**，根据您的活动量可适当调整。

### 2. 宏量营养素配比
- **碳水化合物**：${plan.carbs}（优先选择全谷物、薯类）
- **蛋白质**：${plan.protein}（优质蛋白：鱼、虾、鸡胸肉、豆制品）
- **脂肪**：${plan.fat}（优选不饱和脂肪：橄榄油、坚果、深海鱼）

### 3. 微量营养素补充
- **维生素C**：新鲜蔬果每日300-500g
- **钙质**：奶制品、豆制品、深绿色蔬菜
- **铁质**：红肉、动物肝脏、菠菜

## 三、每日必吃清单

**🌾 谷薯类（250-300g）**
- 全麦面包、糙米、燕麦、红薯、紫薯

**🥬 蔬菜类（500g以上）**
- 深色蔬菜：菠菜、西兰花、紫甘蓝
- 浅色蔬菜：白菜、萝卜、黄瓜
- 菌菇类：香菇、金针菇、木耳

**🍎 水果类（200-350g）**
- 低糖水果：蓝莓、草莓、柚子、苹果
- 时令水果：根据季节选择新鲜水果

**🥩 优质蛋白（150-200g）**
- 动物蛋白：深海鱼、鸡胸肉、鸡蛋
- 植物蛋白：豆腐、豆浆、扁豆

**🥛 奶制品（300ml）**
- 低脂牛奶、酸奶、奶酪

## 四、特别叮嘱

> 🌟 **减盐行动**：每日食盐摄入不超过5g，使用低钠盐替代普通盐。
> 
> 💧 **足量饮水**：每日饮水1500-1700ml，提倡饮用白开水或淡茶水，避免含糖饮料。
> 
> ⏰ **规律进餐**：三餐定时定量，避免暴饮暴食，晚餐不宜过晚。
> 
> 🏃 **适量运动**：结合膳食方案，建议每周至少150分钟中等强度运动。

## 五、一周食材采购建议

**周一至周三**
- 新鲜蔬菜：菠菜、西兰花、番茄、黄瓜
- 蛋白质：鸡胸肉、鸡蛋、豆腐
- 主食：糙米、全麦面包

**周四至周日**
- 新鲜蔬菜：紫甘蓝、胡萝卜、芹菜、蘑菇
- 蛋白质：深海鱼、虾、瘦牛肉
- 主食：燕麦、红薯

---

*本报告基于《中国居民膳食指南（2022版）》核心准则生成，仅供参考。如有疾病请咨询专业医生。*
    `;

    return { report, plan };
}

// Simple Markdown Parser for Demo
function markedParse(text) {
    return text
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^\* (.*$)/gim, '<em>$1</em>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
        .replace(/\n/gim, '<br>');
}

// ===================================
// Toast Notification System (替代alert)
// ===================================
function showToast(message, type = 'info', duration = 3000) {
    // 移除已存在的toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${getToastIcon(type)}</div>
        <div class="toast-message">${message}</div>
    `;

    // 添加到页面
    document.body.appendChild(toast);

    // 触发动画
    setTimeout(() => toast.classList.add('show'), 10);

    // 自动移除
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function getToastIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// 初始化Toast样式（如果还没有）
if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        .toast-notification {
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--color-bg-card);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            padding: 1rem 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            min-width: 280px;
            max-width: 400px;
            opacity: 0;
            transform: translateX(400px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .toast-notification.show {
            opacity: 1;
            transform: translateX(0);
        }
        .toast-icon {
            font-size: 1.25rem;
            flex-shrink: 0;
        }
        .toast-message {
            color: var(--color-text-primary);
            font-size: 0.9rem;
            line-height: 1.4;
        }
        .toast-success {
            border-left: 3px solid var(--color-accent-primary);
        }
        .toast-error {
            border-left: 3px solid #ff6b6b;
        }
        .toast-warning {
            border-left: 3px solid #ffa940;
        }
        .toast-info {
            border-left: 3px solid #1890ff;
        }
        @media (max-width: 768px) {
            .toast-notification {
                right: 10px;
                left: 10px;
                min-width: auto;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
}


// AI 灵感探索模块已删除
// 原因：功能与"融合热点"开关重复，造成信息过载
// 用户如需变体，可直接修改输入框重新生成，或使用"融合热点"开关



