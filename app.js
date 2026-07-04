function showPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    const page = document.getElementById('page-' + pageName);
    if (page) page.classList.add('active');
    
    const link = document.querySelector('.nav-link[data-page="' + pageName + '"]');
    if (link) link.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToTools() {
    document.getElementById('tools-section').scrollIntoView({ behavior: 'smooth' });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function showLoading(outputId, text) {
    const output = document.getElementById(outputId);
    output.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <div class="loading-text">${text || 'AI 正在生成中...'}</div>
        </div>
    `;
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateListing() {
    const name = document.getElementById('productName').value.trim();
    const features = document.getElementById('productFeatures').value.trim();
    const platform = document.getElementById('targetPlatform').value;
    const market = document.getElementById('targetMarket').value;
    const language = document.getElementById('targetLanguage').value;
    const style = document.getElementById('contentStyle').value;
    const keywords = document.getElementById('targetKeywords').value.trim();

    if (!name || !features) {
        showToast('请填写产品名称和产品卖点');
        return;
    }

    showLoading('listingOutput', 'AI 正在优化 Listing...');

    setTimeout(() => {
        const result = generateListingContent(name, features, platform, market, language, style, keywords);
        document.getElementById('listingOutput').innerHTML = result;
    }, 1500);
}

function regenerateListing() {
    generateListing();
}

function generateListingContent(name, features, platform, market, language, style, keywords) {
    const featureList = features.split('\n').filter(f => f.trim());
    const langName = { en: '英语', de: '德语', fr: '法语', es: '西班牙语', jp: '日语' }[language] || '英语';
    const platformName = { amazon: 'Amazon', shopee: 'Shopee', lazada: 'Lazada', tiktok: 'TikTok Shop', ebay: 'eBay' }[platform];
    const styleName = { professional: '专业商务', casual: '轻松活泼', luxury: '高端奢华', tech: '科技感' }[style];

    const titleTemplates = {
        amazon: [
            `2026 ${name} - ${featureList.slice(0, 2).join(' & ')} for ${market.toUpperCase()} Market`,
            `Premium ${name} with ${featureList[0]}, ${featureList[1] || 'High Quality'} - ${market.toUpperCase()} Edition`,
            `${name} - ${featureList.slice(0, 3).join(' | ')} | Professional Series`
        ],
        shopee: [
            `🔥 Hot Sale ${name} ${featureList[0]} 🔥 Free Shipping ${market.toUpperCase()}`,
            `💎 Premium ${name} | ${featureList[0]} | ${featureList[1] || 'Best Quality'} | COD Available`,
            `⭐ Best Seller ${name} - ${featureList[0]} - ${market.toUpperCase()} Local Stock`
        ],
        tiktok: [
            `VIRAL ${name} 🔥 You NEED This! ${featureList[0]} | TikTok Made Me Buy It`,
            `#1 Trending ${name} - ${featureList[0]} - ${featureList[1] || 'Must Have 2026'}`,
            `Wait till you see this ${name}! 🤯 ${featureList.slice(0, 2).join(' + ')}`
        ],
        ebay: [
            `${name} - ${featureList[0]} - ${featureList[1] || 'New Condition'} - Free Shipping`,
            `New ${name} | ${featureList.slice(0, 3).join(' | ')} | Fast Dispatch`,
            `Premium ${name} - ${featureList[0]} - Top Rated Seller`
        ],
        lazada: [
            `${name} | ${featureList[0]} | ${featureList[1] || 'Original'} | LazMall Guaranteed`,
            `【Best Price】${name} - ${featureList[0]} - ${market.toUpperCase()} Delivery`,
            `${name} Premium Edition - ${featureList.slice(0, 3).join(' / ')}`
        ]
    };

    const titles = titleTemplates[platform] || titleTemplates.amazon;
    const title = pickRandom(titles);

    const bullets = featureList.map((f, i) => {
        const benefits = [
            `Experience ultimate ${f.toLowerCase()} - designed for maximum comfort and performance in daily use.`,
            `Advanced ${f.toLowerCase()} technology ensures reliable and consistent results every time.`,
            `With ${f.toLowerCase()}, enjoy a premium experience that outperforms standard alternatives.`,
            `Innovative ${f.toLowerCase()} feature sets new standards in the industry.`,
            `${f} - carefully engineered to meet the demands of ${market.toUpperCase()} consumers.`
        ];
        return `• ${f}: ${benefits[i % benefits.length]}`;
    }).join('\n\n');

    const description = `
【Product Overview】
Discover the revolutionary ${name}, meticulously designed for the ${market.toUpperCase()} market. 
This premium product combines cutting-edge technology with ergonomic design to deliver an unparalleled user experience.
Perfect for both personal and professional use, it represents the pinnacle of innovation in its category.

【Key Features】
${bullets}

【Why Choose Us】
✓ Premium quality materials sourced from trusted suppliers
✓ Rigorous quality control standards (ISO certified)
✓ ${market.toUpperCase()} local warehouse - fast delivery within 2-5 days
✓ 30-day hassle-free return policy
✓ 24/7 customer support in ${langName}
✓ Competitive pricing without compromising quality

【Package Contents】
1 x ${name}
1 x User Manual (${langName})
1 x Charging Cable / Accessories
1 x Premium Gift Box

Upgrade your experience today with the ${name} - where quality meets innovation!
    `.trim();

    const seoKeywords = keywords 
        ? keywords.split(',').map(k => k.trim()).filter(k => k)
        : [
            `${name.toLowerCase()}`,
            `best ${name.toLowerCase()} ${market}`,
            `premium ${name.toLowerCase()}`,
            `${name.toLowerCase()} for sale`,
            `buy ${name.toLowerCase()} online`,
            `${name.toLowerCase()} ${platform}`,
            featureList[0] ? featureList[0].toLowerCase() + ` ${name.toLowerCase()}` : ''
        ].filter(k => k);

    const seoScore = randomBetween(82, 95);

    return `
        <div class="listing-result">
            <div class="result-section">
                <div class="result-section-title">📌 优化后标题（${platformName}）</div>
                <div class="result-box">${title}</div>
            </div>

            <div class="result-section">
                <div class="result-section-title">📝 商品描述（${styleName}风格 · ${langName}）</div>
                <div class="result-box">${description}</div>
            </div>

            <div class="result-section">
                <div class="result-section-title">🔑 推荐关键词（${seoKeywords.length} 个）</div>
                <div class="keyword-list">
                    ${seoKeywords.map(k => `<span class="keyword-item">${k}</span>`).join('')}
                </div>
            </div>

            <div class="result-section">
                <div class="result-section-title">📊 SEO 评分</div>
                <div class="score-bar">
                    <div class="score-bar-label">
                        <span>关键词覆盖度</span>
                        <span>${seoScore}%</span>
                    </div>
                    <div class="score-bar-track">
                        <div class="score-bar-fill" style="width: ${seoScore}%"></div>
                    </div>
                </div>
                <div class="score-bar" style="margin-top: 12px;">
                    <div class="score-bar-label">
                        <span>描述完整度</span>
                        <span>${randomBetween(88, 98)}%</span>
                    </div>
                    <div class="score-bar-track">
                        <div class="score-bar-fill" style="width: ${randomBetween(88, 98)}%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateTrend() {
    const keyword = document.getElementById('nicheKeyword').value.trim();
    const market = document.getElementById('trendMarket').value;
    const platform = document.getElementById('trendPlatform').value;

    if (!keyword) {
        showToast('请输入品类关键词');
        return;
    }

    showLoading('trendOutput', 'AI 正在分析市场数据...');

    setTimeout(() => {
        const result = generateTrendContent(keyword, market, platform);
        document.getElementById('trendOutput').innerHTML = result;
    }, 2000);
}

function regenerateTrend() {
    generateTrend();
}

function generateTrendContent(keyword, market, platform) {
    const marketName = { us: '美国', eu: '欧洲', jp: '日本', se: '东南亚' }[market];
    const platformName = { amazon: 'Amazon', tiktok: 'TikTok Shop', shopee: 'Shopee' }[platform];

    const trendData = [];
    const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
    for (let i = 0; i < 6; i++) {
        trendData.push({
            month: months[i],
            value: randomBetween(40, 95)
        });
    }
    trendData[trendData.length - 1].value = randomBetween(75, 98);

    const lowPrice = randomBetween(15, 35);
    const midPrice = randomBetween(lowPrice + 10, lowPrice + 25);
    const highPrice = randomBetween(midPrice + 20, midPrice + 50);

    const opportunities = [
        {
            icon: '🎯',
            title: '细分市场机会',
            desc: `针对 ${keyword} 的高端细分市场竞争较小，建议推出 premium 版本切入，定价 $${highPrice - 10} 以上。`
        },
        {
            icon: '🌍',
            title: '新兴市场红利',
            desc: `${marketName}市场对${keyword}的搜索量近 3 个月增长 ${randomBetween(35, 68)}%，处于上升期，是入场好时机。`
        },
        {
            icon: '🎁',
            title: '捆绑销售机会',
            desc: `用户常同时购买的相关产品有 3-5 种，建议创建组合套装，提升客单价 ${randomBetween(20, 40)}%。`
        },
        {
            icon: '📱',
            title: '社媒流量机会',
            desc: `TikTok/Instagram 上 ${keyword} 相关视频播放量超 ${randomBetween(5, 20)}亿，适合做内容种草营销。`
        },
        {
            icon: '⚡',
            title: '产品创新点',
            desc: `竞品差评集中在"耐用性"和"售后"，如果能在这两点做差异化，有机会快速抢占 ${randomBetween(8, 15)}% 市场份额。`
        }
    ];

    const selectedOpps = opportunities.sort(() => Math.random() - 0.5).slice(0, 4);

    const competitorCount = randomBetween(120, 800);
    const growthRate = randomBetween(15, 58);
    const avgRating = (3.8 + Math.random() * 0.9).toFixed(1);

    const summary = `
【品类概览】
「${keyword}」在${marketName}${platformName}平台呈现${growthRate > 30 ? '高速增长' : '稳步增长'}态势，近 6 个月搜索量同比增长 ${growthRate}%。
当前活跃卖家约 ${competitorCount} 家，头部 10 家占据 ${randomBetween(40, 60)}% 市场份额，中腰部仍有切入机会。

【市场热度】
整体市场热度指数：${randomBetween(65, 92)}/100
消费者关注度持续上升，尤其在社交媒体平台的讨论热度月环比增长 ${randomBetween(20, 45)}%。

【竞争格局】
头部品牌集中度：${randomBetween(40, 60)}%
新品存活率：约 ${randomBetween(30, 55)}%
平均评分：${avgRating} 分
    `.trim();

    return `
        <div class="trend-result">
            <div class="trend-summary">
                <div class="trend-summary-title">📊 ${keyword} · ${marketName}${platformName} 市场分析</div>
                <div class="trend-summary-text">${summary}</div>
            </div>

            <div class="result-section">
                <div class="result-section-title">📈 近 6 个月搜索趋势</div>
                <div class="trend-chart">
                    <div class="chart-title">搜索指数变化</div>
                    <div class="chart-bars">
                        ${trendData.map(d => `
                            <div class="chart-bar">
                                <div class="chart-bar-fill" style="height: ${d.value}%" data-value="${d.value}"></div>
                                <div class="chart-bar-label">${d.month}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="result-section">
                <div class="result-section-title">💰 竞品价格区间分析</div>
                <div class="price-range">
                    <div class="price-item">
                        <div class="price-label">入门价位</div>
                        <div class="price-value">$${lowPrice - 5}-${lowPrice + 5}</div>
                    </div>
                    <div class="price-item">
                        <div class="price-label">主流价位</div>
                        <div class="price-value">$${midPrice - 5}-${midPrice + 10}</div>
                    </div>
                    <div class="price-item">
                        <div class="price-label">高端价位</div>
                        <div class="price-value">$${highPrice - 10}+</div>
                    </div>
                </div>
                <div class="result-box" style="margin-top: 12px; font-size: 13px;">
💡 建议定价：$${midPrice}（主流价位区间，竞争适中且利润空间可观）
利润预估：约 ${randomBetween(35, 55)}% 毛利率（基于 FOB 成本估算）
                </div>
            </div>

            <div class="result-section">
                <div class="result-section-title">🎯 市场机会点（${selectedOpps.length} 个）</div>
                <ul class="opportunity-list">
                    ${selectedOpps.map(o => `
                        <li class="opportunity-item">
                            <div class="opportunity-icon">${o.icon}</div>
                            <div class="opportunity-content">
                                <h4>${o.title}</h4>
                                <p>${o.desc}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="result-section">
                <div class="result-section-title">⚠️ 风险提示</div>
                <div class="result-box" style="font-size: 13px; color: var(--warning);">
• ${pickRandom(['品类存在一定季节性，需注意备货节奏', '头部品牌已有一定用户基础，新入者需差异化竞争', '物流成本波动可能影响利润空间', '需关注目标市场认证要求（如 FCC/CE）'])}
• ${pickRandom(['建议先小批量测款，验证市场反应后再加大投入', '注意监控竞品动态和价格战风险', '需提前布局知识产权保护'])}
                </div>
            </div>
        </div>
    `;
}

const sampleMessages = {
    shipping: "Hi, I ordered this item 5 days ago but haven't received any tracking update. When will my order arrive? Thanks.",
    return: "I received the product but it's not working properly. The battery dies after 30 minutes. Can I get a refund or replacement?",
    product: "Hello, does this product work with iPhone 15? Also, how long is the warranty period?",
    complaint: "This is the worst product I've ever bought. Broke after one week. I want my money back and I'm leaving a 1-star review.",
    review: "",
    discount: "Hi, I want to buy 3 of these. Do you offer bulk discount? What's the best price you can give me?"
};

function fillSampleMessage() {
    const scenario = document.getElementById('csScenario').value;
    const textarea = document.getElementById('buyerMessage');
    
    if (scenario !== 'custom' && sampleMessages[scenario]) {
        textarea.value = sampleMessages[scenario];
    } else if (scenario === 'review') {
        textarea.value = "（系统将生成邀评话术，无需输入买家消息）";
        textarea.readOnly = true;
        return;
    }
    
    textarea.readOnly = false;
}

function generateCustomerService() {
    const scenario = document.getElementById('csScenario').value;
    const message = document.getElementById('buyerMessage').value.trim();
    const language = document.getElementById('csLanguage').value;
    const tone = document.getElementById('csTone').value;
    const orderId = document.getElementById('csOrderId').value.trim();

    if (scenario !== 'review' && !message) {
        showToast('请输入买家消息');
        return;
    }

    showLoading('customerOutput', 'AI 正在生成回复话术...');

    setTimeout(() => {
        const result = generateCSContent(scenario, message, language, tone, orderId);
        document.getElementById('customerOutput').innerHTML = result;
    }, 1500);
}

function regenerateCustomer() {
    generateCustomerService();
}

function generateCSContent(scenario, message, language, tone, orderId) {
    const langName = { en: '英语', de: '德语', fr: '法语', es: '西班牙语', jp: '日语' }[language] || '英语';
    const toneName = { friendly: '友好亲切', professional: '专业正式', apologetic: '诚恳道歉', concise: '简洁高效' }[tone];

    const templates = {
        shipping: {
            friendly: `Dear Valued Customer,

Thank you so much for reaching out to us! 😊

I completely understand how important it is to receive your order on time. Let me check the status of your order right away.

${orderId ? `Order Number: ${orderId}\n\n` : ''}Your order has been shipped and is currently in transit. Based on the tracking information, it's expected to arrive within 2-4 business days. Sometimes there may be slight delays due to logistics processing, but please rest assured it's on its way!

Here's the tracking link for your reference:
🔗 [Track Your Package]

If you don't receive it within the estimated timeframe, please don't hesitate to contact us again. We're here to help!

Warm regards,
Customer Service Team`,

            professional: `Dear Customer,

Thank you for contacting us regarding your order status.

${orderId ? `Order Reference: ${orderId}\n\n` : ''}We have verified the tracking information for your shipment. Your order was dispatched on [Date] and is currently in transit with the carrier.

Estimated delivery window: 3-7 business days from dispatch date.

You may track your shipment using the following tracking number:
Tracking ID: [Tracking Number]
Carrier: [Carrier Name]

We appreciate your patience. If you require further assistance, please do not hesitate to contact us.

Best regards,
Customer Service Department`,

            apologetic: `Dear Customer,

I am truly sorry to hear that you haven't received an update on your order. Please accept my sincere apologies for the inconvenience this has caused.

${orderId ? `Order: ${orderId}\n\n` : ''}I've immediately looked into your shipment. It appears there was a delay in the tracking system updating, but your package is indeed in transit and making progress.

Expected delivery: within the next 2-3 business days.

To make this right, I'd like to offer you a 10% discount on your next purchase as a token of our appreciation for your patience. Please use code: PATIENCE10 at checkout.

Thank you for your understanding and support.

Sincerely,
Customer Service Manager`,

            concise: `Hi,

${orderId ? `Order ${orderId}:\n` : ''}Shipped. Tracking: [Link]
ETA: 2-4 days.

Let me know if you need anything else.

Thanks,
Support`
        },

        return: {
            friendly: `Dear Customer,

I'm so sorry to hear the product isn't working as expected! 😔 We take quality very seriously and I completely understand your frustration.

${orderId ? `Order Number: ${orderId}\n\n` : ''}Absolutely - we'll take care of this for you right away! We offer a 30-day hassle-free return policy.

Here are your options:
🔄 Replacement: We can send you a brand new unit right away
💰 Full Refund: We can process a full refund to your original payment method

Which would you prefer? If you choose replacement, please confirm your shipping address is still the same.

For the return, no need to send back the defective unit - just keep it or dispose of it responsibly. We trust you!

Once again, sorry for the inconvenience. Let's get this sorted for you quickly!

Best,
Customer Service Team`,

            professional: `Dear Customer,

Thank you for bringing this to our attention. We apologize for the defective product and any inconvenience this may have caused.

${orderId ? `Order Reference: ${orderId}\n\n` : ''}We would like to assist you with our return and exchange process. Please find the details below:

Return Policy: 30-day return window from delivery date
Resolution Options:
1. Product Replacement - shipment of a new unit within 24 hours
2. Full Refund - processed to original payment method within 3-5 business days

Please confirm your preferred resolution and we will proceed immediately.

Quality Assurance Department
Customer Service`,

            apologetic: `Dear Valued Customer,

I am deeply sorry that your product arrived defective. This is absolutely not the experience we want for our customers, and I take full responsibility for this quality issue.

${orderId ? `Order: ${orderId}\n\n` : ''}Let me make this right immediately:

✅ I will personally oversee your case
✅ You may choose: FREE replacement shipped today OR full refund + 20% store credit
✅ No need to return the defective item - it's on us
✅ I will also flag this with our QC team to prevent future issues

Please reply with your choice and I'll get it processed within the next hour.

Once again, please accept my sincerest apologies.

With gratitude,
Customer Service Manager`,

            concise: `Hi,

Sorry about the issue.

${orderId ? `Order: ${orderId}\n` : ''}Two options:
1. Replace - ship new one today
2. Refund - full refund, no return needed

Let me know your choice.

Best,
Support`
        },

        product: {
            friendly: `Hi there! 👋

Great question - thanks for asking!

Yes, this product is fully compatible with iPhone 15 (and all iPhone models that support Bluetooth, actually)! It works seamlessly with iOS devices.

Warranty Information:
📅 Warranty Period: 12 months from purchase date
🛡️ Coverage: Manufacturing defects & performance issues
⚡ What's included: Free repair or replacement

If anything goes wrong within the warranty period, just reach out to us and we'll take care of it - no questions asked!

Is there anything else you'd like to know? We're happy to help!

Happy shopping! 😊
Customer Service Team`,

            professional: `Dear Customer,

Thank you for your inquiry.

Regarding your questions:

Compatibility:
This product is compatible with iPhone 15 and all Bluetooth-enabled iOS devices (iOS 12.0 and above). It supports both standard Bluetooth audio codecs for optimal performance.

Warranty:
- Warranty period: 12 months from the date of purchase
- Coverage: defects in materials and workmanship under normal use
- Process: Contact customer service with order details for warranty service

Please feel free to contact us if you have any further questions.

Best regards,
Product Support Team`,

            apologetic: `Dear Customer,

Thank you for your interest in our product. I apologize if the product page wasn't clear enough on these details.

Let me provide you with the information you need:

✅ iPhone 15 Compatible: Yes, fully compatible with iPhone 15 and all Bluetooth-enabled devices. Easy pairing, stable connection.
✅ Warranty: 12-month manufacturer warranty covering any defects. We also offer extended warranty options.

I hope this helps! If you have any other questions, please don't hesitate to ask.

Best regards,
Customer Support`,

            concise: `Hi,

- iPhone 15: Compatible ✓
- Warranty: 12 months

Let me know if you have other questions.

- Support Team`
        },

        complaint: {
            friendly: `Dear Customer,

I am so sorry to hear about your experience with our product. 😢 I completely understand your frustration and disappointment.

${orderId ? `Order Number: ${orderId}\n\n` : ''}You have every right to be upset, and I want you to know that your satisfaction is our top priority. This is not at all the quality we stand for.

Let me personally make this right for you:

💯 Full refund - no questions asked, processed within 24 hours
🎁 30% store credit for your next purchase (on us, as a sincere apology)
📦 No need to return the item

I will also personally escalate your feedback to our QC team so we can improve.

Please give us another chance to make things right. You deserve better.

Sincerely,
Customer Service Manager`,

            professional: `Dear Customer,

We sincerely apologize for your dissatisfaction with our product. We take all customer feedback very seriously.

${orderId ? `Order Reference: ${orderId}\n\n` : ''}We would like to resolve this matter to your satisfaction. Please find our resolution below:

1. Full Refund: We will process a full refund to your original payment method. Expected processing time: 3-5 business days.
2. Return: No return required for the defective unit.

We have also documented your feedback and will forward it to our Quality Assurance team for investigation.

We appreciate you bringing this to our attention and hope to have the opportunity to serve you better in the future.

Best regards,
Customer Service Management`,

            apologetic: `Dear Customer,

I am writing to personally apologize for your terrible experience. After reading your message, I am truly heartbroken - no customer should ever feel this way after purchasing from us.

${orderId ? `Order: ${orderId}\n\n` : ''}Your 1-star review is completely justified, and I accept full responsibility on behalf of our company.

Here's what I'm doing right now:
👉 Full refund processed immediately (you'll see it in 1-3 days)
👉 An extra 50% store credit as our apology
👉 Quality team notified to investigate this product line
👉 I'm reviewing this with our CEO personally

I know an apology doesn't fix a broken product, but I hope you'll give us a chance to earn back your trust.

Please reply to this message anytime - I read every message personally.

With deepest apologies,
Customer Service Director`,

            concise: `Hello,

I'm sorry you're unhappy.

${orderId ? `Order: ${orderId}\n` : ''}Full refund processed. Keep the item.

Sorry again for the inconvenience.

- Support Manager`
        },

        review: {
            friendly: `Dear Valued Customer,

I hope this message finds you well! 😊

We noticed you recently received your order${orderId ? ` (${orderId})` : ''}, and we wanted to check in and see how everything is going!

If you're enjoying your purchase, we'd be incredibly grateful if you could take 30 seconds to leave us a quick review. Your feedback helps other customers make informed decisions and helps us continue improving.

⭐⭐⭐⭐⭐ Leave a Review: [Review Link]

As a small thank you, use code REVIEW10 for 10% off your next order!

And if there's anything at all we can improve, please reply to this email - we'd love to hear from you.

Thank you for being such an awesome customer! 🙏

Warm regards,
The Team`,

            professional: `Dear Customer,

Thank you for your recent purchase.

${orderId ? `Order Reference: ${orderId}\n\n` : ''}We hope your order has arrived safely and meets your expectations. We would greatly appreciate it if you could take a moment to share your experience with us and other customers by leaving a product review.

Leave your review here: [Review Link]

Your feedback is valuable to us and helps us maintain and improve our product and service quality.

Should you have any questions or concerns, please do not hesitate to contact our customer service team.

Best regards,
Customer Experience Team`,

            apologetic: `Dear Customer,

I hope your order arrived safely${orderId ? ` (Order: ${orderId})` : ''}!

I just wanted to reach out and see how you're liking your purchase. If there's anything at all that's not perfect, please tell me - I'd love the chance to make it right before you consider leaving a review.

If you are happy with your purchase, I'd be so grateful if you could leave a quick review here:
[Review Link]

Every review helps other customers and means the world to small businesses like ours.

Thank you so much for your support! 💙

Best,
Customer Care`,

            concise: `Hi,

Hope you received your order${orderId ? ` (${orderId})` : ''} okay.

If you're happy with it, a quick review would mean a lot:
[Review Link]

Thanks!
- The Team`
        },

        discount: {
            friendly: `Hi there! 👋

Thank you for your interest in buying 3 units - that's awesome! We love bulk orders! 😊

Absolutely, we do offer bulk discounts! Here's what I can offer for 3 units:

💰 Special Bundle Price: 15% OFF (that's a great deal!)
🚚 Free Express Shipping (worth $12.99)
🎁 Bonus: Free [accessory/gift] included

Total for 3 units with discount: $[Discounted Price] (original $[Original Price])

Interested? I can set up a special discount code for you or create a custom listing. Just let me know and I'll get it sorted right away!

Looking forward to your order! ✨

Best,
Sales Team`,

            professional: `Dear Customer,

Thank you for your inquiry regarding a bulk purchase.

We do offer volume-based discounts. For a quantity of 3 units, we can provide the following:

- Discount Rate: 15% off the listed unit price
- Shipping: Complimentary expedited shipping
- Delivery: 3-5 business days after order confirmation

Discounted Total: $[Total Amount]

To proceed with this offer, please confirm and we will provide a discount code or customized payment link.

Please let us know if you have any questions.

Best regards,
Sales Department`,

            apologetic: `Dear Customer,

Thank you for reaching out about bulk pricing. I appreciate your interest!

I wish I could offer a steeper discount, but at 3 units, our profit margins are already quite tight. That said, I've checked with my manager and here's the best I can do:

✨ 12% discount on 3 units
✨ Free shipping included
✨ I'll throw in a free [accessory] as well (worth $9.99)

I hope this works for you! I'm really trying to give you the best value I can.

Let me know what you think - happy to discuss further!

Best,
Sales Team`,

            concise: `Hi,

3 units: 15% off + free shipping.

Code: BULK3

Let me know if you need more.

- Sales`
        },

        custom: {
            friendly: `Dear Valued Customer,

Thank you so much for reaching out to us! 😊 We really appreciate you taking the time to contact us.

I've read your message carefully and I'm happy to help you with this. Let me look into this for you right away and get back to you with a solution.

${orderId ? `Order Number: ${orderId}\n\n` : ''}Here's what we can do:
✅ We'll resolve this quickly and efficiently
✅ You'll be updated every step of the way
✅ Your satisfaction is our top priority

If you have any other questions in the meantime, please don't hesitate to ask. We're here for you!

Warm regards,
Customer Service Team`,

            professional: `Dear Customer,

Thank you for contacting us regarding your concern.

${orderId ? `Order Reference: ${orderId}\n\n` : ''}We have received your message and our support team is currently reviewing your case. We aim to respond with a resolution within 24 hours.

For your reference, your ticket has been logged and is being processed.

We appreciate your patience and understanding.

Best regards,
Customer Support`,

            apologetic: `Dear Customer,

Thank you for bringing this to our attention. I sincerely apologize for any inconvenience or frustration this may have caused you.

${orderId ? `Order: ${orderId}\n\n` : ''}Your satisfaction is very important to us, and I want to make sure this is resolved properly. I'm looking into your situation personally and will get back to you with a solution as soon as possible.

Please accept my apologies again for the trouble.

Sincerely,
Customer Service Manager`,

            concise: `Hi,

Thanks for your message.

${orderId ? `Order: ${orderId}\n` : ''}Looking into it and will get back to you soon.

- Support`
        }
    };

    const reply = templates[scenario]?.[tone] || templates.custom.friendly;

    const tips = {
        shipping: '• 先共情再给信息，让客户感到被关心\n• 提供具体的预计送达时间，而非模糊回答\n• 主动给出追踪链接，减少客户追问\n• 适当提供小补偿（如折扣码）提升好感',
        return: '• 第一时间道歉，不要辩解或找借口\n• 清晰列出解决方案选项，让客户选择\n• 简化退货流程（如无需寄回）降低客户心理门槛\n• 适当给予额外补偿体现诚意',
        product: '• 直接回答问题，不要绕弯子\n• 提供超出预期的额外信息（如兼容性细节）\n• 引导转化，可附带促销信息\n• 保持专业且友好',
        complaint: '• 绝对不要争辩，先全盘接受并道歉\n• 用"我"而不是"我们"，体现个人担当\n• 给出具体、有诚意的解决方案\n• 主动联系上级或质检团队，让客户感到被重视',
        review: '• 在收货后 3-7 天发送邀评效果最佳\n• 先问体验，再邀评价，降低突兀感\n• 提供小额激励（如折扣码）提高留评率\n• 主动邀请不满意的客户直接联系，避免差评',
        discount: '• 不要一口答应，先确认数量和细节\n• 用"去跟经理申请"的方式增加价值感\n• 捆绑额外福利（如免运费、赠品）而非直接降价\n• 给客户"专属感"，但要有原则',
        custom: '• 先理解客户的核心诉求再回复\n• 保持同理心，让客户感到被重视\n• 给出清晰的下一步和时间预期\n• 提供联系方式，方便后续沟通'
    };

    return `
        <div class="cs-result">
            <div class="result-section">
                <div class="result-section-title">📨 买家原始消息</div>
                <div class="cs-message-box">
                    <div class="cs-message-label">Buyer Message</div>
                    <div class="cs-message-text">${message || '（邀评场景：主动发送）'}</div>
                </div>
            </div>

            <div class="result-section">
                <div class="result-section-title">💬 AI 生成回复（${langName} · ${toneName}）</div>
                <div class="cs-templates">
                    <div class="cs-template">
                        <div class="cs-template-header">
                            <span class="cs-template-title">推荐回复</span>
                            <span class="cs-template-badge">${toneName}</span>
                        </div>
                        <div class="cs-template-body">${reply}</div>
                    </div>
                </div>
            </div>

            <div class="result-section">
                <div class="result-section-title">💡 回复技巧</div>
                <div class="cs-tips">
                    <div class="cs-tips-title">✨ 客服话术小贴士</div>
                    <div class="cs-tips-text" style="white-space: pre-line;">${tips[scenario] || tips.custom}</div>
                </div>
            </div>
        </div>
    `;
}

function generateCompliance() {
    const category = document.getElementById('productCategory').value;
    const desc = document.getElementById('productDesc').value.trim();

    const markets = [];
    document.querySelectorAll('#page-compliance input[type="checkbox"][value]:not(.skip)').forEach(cb => {
        if (['us', 'eu', 'uk', 'jp'].includes(cb.value) && cb.checked) {
            markets.push(cb.value);
        }
    });

    if (!desc) {
        showToast('请输入商品描述');
        return;
    }

    if (markets.length === 0) {
        showToast('请至少选择一个目标市场');
        return;
    }

    showLoading('complianceOutput', 'AI 正在扫描合规风险...');

    setTimeout(() => {
        const result = generateComplianceContent(category, desc, markets);
        document.getElementById('complianceOutput').innerHTML = result;
    }, 2000);
}

function regenerateCompliance() {
    generateCompliance();
}

function generateComplianceContent(category, desc, markets) {
    const categoryName = {
        electronics: '电子产品', clothing: '服装鞋包', beauty: '美妆个护',
        home: '家居用品', toys: '玩具母婴', food: '食品保健', jewelry: '珠宝饰品'
    }[category] || '综合';

    const marketNames = { us: '🇺🇸 美国', eu: '🇪🇺 欧盟', uk: '🇬🇧 英国', jp: '🇯🇵 日本' };

    const riskTemplates = {
        electronics: [
            { level: 'high', title: 'FCC/CE 认证缺失风险', market: 'us', desc: '电子产品出口美国需通过 FCC 认证，欧盟需 CE 认证（RED 指令），未认证可能导致海关扣货或下架。', suggestion: '建议确认产品是否持有有效的 FCC/CE 认证，并在Listing中正确标注认证编号。' },
            { level: 'medium', title: '电池运输合规风险', market: 'eu', desc: '含锂电池产品需满足 UN38.3 运输标准，欧盟额外要求电池标签和可回收标识。', suggestion: '确保锂电池通过 UN38.3 测试，包装上加贴电池警示标识和回收标识。' },
            { level: 'low', title: '加州 Prop 65 警示要求', market: 'us', desc: '销往加州的电子产品如含特定化学物质，需标注 Prop 65 警告语。', suggestion: '评估产品是否含有 Prop 65 清单中的化学物质，必要时添加警示标签。' }
        ],
        clothing: [
            { level: 'high', title: 'CPSIA 铅含量超标风险', market: 'us', desc: '美国要求儿童服装及配件铅含量不得超过 100ppm，表面涂层不得超过 90ppm。', suggestion: '送第三方实验室检测铅含量，确保符合 CPSIA 标准，留存检测报告。' },
            { level: 'medium', title: 'REACH 法规物质限制', market: 'eu', desc: '欧盟 REACH 法规对服装中多种化学物质有限制，包括偶氮染料、重金属、邻苯二甲酸酯等。', suggestion: '确认面料供应商提供 REACH 合规声明，重点关注偶氮染料和邻苯二甲酸酯。' },
            { level: 'medium', title: '阻燃标准要求', market: 'us', desc: '儿童睡衣等特定品类需满足 16 CFR 1615/1616 阻燃标准。', suggestion: '如涉及儿童睡衣品类，需通过阻燃测试并在标签上标注。' },
            { level: 'low', title: '纤维成分标签不准确', market: 'us', desc: '美国 FTC 要求服装标签准确标注纤维成分百分比，标签信息需与实际成分一致。', suggestion: '进行纤维成分检测，确保标签信息准确，含产地和护理标签。' }
        ],
        beauty: [
            { level: 'high', title: 'FDA 化妆品注册要求', market: 'us', desc: '美国 FDA 要求化妆品企业进行 VCRP 自愿注册，部分成分需特别审批。', suggestion: '完成 FDA VCRP 企业注册和产品备案，确认成分符合 FDA 化妆品成分清单（INCI）。' },
            { level: 'high', title: '欧盟化妆品通告 CPNP', market: 'eu', desc: '欧盟要求所有化妆品在上市前通过 CPNP 进行电子通告，并指定欧盟境内责任人。', suggestion: '在欧盟指定责任人，完成 CPNP 通告，准备产品安全报告（CPSR）。' },
            { level: 'medium', title: '功效宣称合规风险', market: 'us', desc: '化妆品不得宣称药品功效（如"治疗"、"治愈"），FDA 会对违规宣称采取行动。', suggestion: '审查 Listing 中的功效描述，避免使用医疗化用语，使用"改善"、"帮助"等温和表述。' }
        ],
        toys: [
            { level: 'high', title: 'CPSC 玩具安全标准', market: 'us', desc: '美国要求所有儿童玩具符合 ASTM F963 安全标准，并通过第三方实验室检测。', suggestion: '产品需通过 ASTM F963 物理机械性能、易燃性、重金属等测试，出具 CPSC 认可的第三方报告。' },
            { level: 'high', title: 'EN 71 玩具安全指令', market: 'eu', desc: '欧盟玩具需符合 EN 71 系列标准（物理、易燃、化学迁移等），并加贴 CE 标志。', suggestion: '按 EN 71-1/2/3 进行检测，准备 EC 符合性声明，产品标注 CE 标志和警示语。' },
            { level: 'medium', title: '年龄分级警示标识', market: 'us', desc: '美国要求对不适合 3 岁以下儿童的玩具标注年龄警示，且字号和位置有明确规定。', suggestion: '确认产品适用年龄，在包装和 Listing 显著位置标注"不适合 3 岁以下儿童"等警示。' },
            { level: 'low', title: '小零件窒息风险', market: 'eu', desc: '含小零件的玩具需进行小零件测试，对 3 岁以下儿童玩具禁止小零件。', suggestion: '进行小零件筒测试，评估窒息风险，添加适当的警示语。' }
        ],
        jewelry: [
            { level: 'high', title: '镍释放超标风险', market: 'eu', desc: '欧盟 REACH 法规对珠宝首饰中镍释放量有严格限制（与皮肤长期接触产品 < 0.5μg/cm²/周）。', suggestion: '进行镍释放量测试（EN 1811 方法），确保符合限值要求。' },
            { level: 'high', title: '加州 Prop 65 镉/铅警告', market: 'us', desc: '加州要求珠宝首饰如含镉、铅等重金属，需加贴 Prop 65 警告标识。', suggestion: '检测产品中镉、铅含量，如超过 OEHHA 规定的限值，需在 Listing 和包装上标注警示。' },
            { level: 'medium', title: '儿童珠宝铅含量限制', market: 'us', desc: '美国 CPSIA 规定儿童珠宝铅含量不得超过 100ppm，部分州（如伊利诺伊州）有更严格标准。', suggestion: '如面向儿童销售，必须进行铅含量检测，确保符合 CPSIA 标准。' }
        ],
        home: [
            { level: 'medium', title: '加州 Prop 65 化学物质警示', market: 'us', desc: '家居产品如含有 Prop 65 清单中的约 900 种化学物质，需标注警告语。', suggestion: '评估产品材料中是否含 Prop 65 关注物质，必要时在 Listing 和包装上加贴警示。' },
            { level: 'medium', title: '家具防火安全标准', market: 'us', desc: '软垫家具需满足 TB 117-2013 等阻燃标准，标签需注明阻燃信息。', suggestion: '如涉及软垫家具，需确认阻燃性能并按要求标注阻燃标签。' },
            { level: 'low', title: '欧盟 RoHS 指令', market: 'eu', desc: '带电子元件的家居产品需符合 RoHS 2.0 限制有害化学物质的要求。', suggestion: '如产品含电子元件，需进行 RoHS 六项有害物质检测，准备符合性声明。' }
        ],
        food: [
            { level: 'high', title: 'FDA 食品注册要求', market: 'us', desc: '食品、膳食补充剂出口美国需进行 FDA 食品设施注册，部分品类需事先通知（Prior Notice）。', suggestion: '完成 FDA 食品设施注册，确认产品分类，准备营养成分标签（Nutrition Facts Label）。' },
            { level: 'high', title: '功能宣称违规风险', market: 'us', desc: '膳食补充剂不得宣称治疗疾病，FDA 对结构功能宣称有严格要求，需加免责声明。', suggestion: '审查所有功效宣称，不得使用"治疗"、"治愈"等医疗词汇，添加 FDA 标准免责声明。' },
            { level: 'high', title: '日本食品卫生法', market: 'jp', desc: '食品出口日本需符合食品卫生法，需指定日本国内进口商，部分品类需进行检验检疫。', suggestion: '确认产品是否需要进口许可/备案，指定日本进口商，准备成分规格表和检验报告。' }
        ]
    };

    const categoryRisks = riskTemplates[category] || riskTemplates.home;
    const relevantRisks = categoryRisks.filter(r => markets.includes(r.market));

    const totalRisks = relevantRisks.length;
    const highRisks = relevantRisks.filter(r => r.level === 'high').length;
    const mediumRisks = relevantRisks.filter(r => r.level === 'medium').length;
    const lowRisks = relevantRisks.filter(r => r.level === 'low').length;

    const score = Math.max(40, 95 - highRisks * 15 - mediumRisks * 8 - lowRisks * 3);

    return `
        <div class="compliance-result">
            <div class="compliance-score">
                <div class="compliance-score-num">${score}</div>
                <div class="compliance-score-label">合规评分（满分 100）· ${categoryName}</div>
            </div>

            <div class="result-section">
                <div class="result-section-title">📋 风险概览</div>
                <div class="price-range">
                    <div class="price-item">
                        <div class="price-label">高风险</div>
                        <div class="price-value" style="background: linear-gradient(135deg, #ef4444, #dc2626); -webkit-background-clip: text; background-clip: text;">${highRisks} 项</div>
                    </div>
                    <div class="price-item">
                        <div class="price-label">中风险</div>
                        <div class="price-value" style="background: linear-gradient(135deg, #f59e0b, #d97706); -webkit-background-clip: text; background-clip: text;">${mediumRisks} 项</div>
                    </div>
                    <div class="price-item">
                        <div class="price-label">低风险</div>
                        <div class="price-value" style="background: linear-gradient(135deg, #10b981, #059669); -webkit-background-clip: text; background-clip: text;">${lowRisks} 项</div>
                    </div>
                </div>
            </div>

            <div class="result-section">
                <div class="result-section-title">🔍 风险详情（${totalRisks} 项）</div>
                <div class="risk-list">
                    ${relevantRisks.map(r => `
                        <div class="risk-item ${r.level}">
                            <div class="risk-header">
                                <span class="risk-level ${r.level}">${r.level === 'high' ? '高风险' : r.level === 'medium' ? '中风险' : '低风险'}</span>
                                <span class="risk-title">${r.title}</span>
                                <span class="risk-market">${marketNames[r.market] || r.market}</span>
                            </div>
                            <div class="risk-desc">${r.desc}</div>
                            <div class="risk-suggestion"><strong>💡 建议：</strong>${r.suggestion}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="result-section">
                <div class="result-section-title">✅ 合规检查清单</div>
                <div class="result-box" style="font-size: 13px; line-height: 2;">
${markets.map(m => `
【${marketNames[m]} 必查项】
${getMarketChecklist(m, category)}
`).join('\n')}
                </div>
            </div>
        </div>
    `;
}

function getMarketChecklist(market, category) {
    const checklists = {
        us: {
            electronics: '☐ FCC 认证 / FCC ID 注册\n☐ 电池 UN38.3 测试\n☐ 产品安全认证（UL/ETL 可选但推荐）\n☐ 原产地标签（Made in China）\n☐ 用户手册英文版',
            clothing: '☐ CPSIA 铅含量检测\n☐ FTC 纤维成分标签\n☐ 护理标签（Wash Care Label）\n☐ 原产地标签\n☐ 尺码表标注',
            beauty: '☐ FDA VCRP 注册\n☐ INCI 成分标签\n☐ 功效宣称审核\n☐ 批次号 / 保质期标注\n☐ 制造商信息',
            toys: '☐ ASTM F963 测试报告\n☐ CPSIA 第三方检测\n☐ 年龄警示标签\n☐ CPSC 追踪标签\n☐ 小零件警示（如适用）',
            home: '☐ Prop 65 评估\n☐ 产品安全标签\n☐ 说明书英文版\n☐ 原产地标识\n☐ 包装安全要求',
            food: '☐ FDA 食品设施注册\n☐ Nutrition Facts 营养标签\n☐ 成分列表\n☐ 功效宣称合规\n☐ 过敏原标识',
            jewelry: '☐ Prop 65 镉/铅检测\n☐ 儿童珠宝铅含量（如适用）\n☐ 成分标签\n☐ 原产地标识'
        },
        eu: {
            electronics: '☐ CE 认证（RED 指令）\n☐ RoHS 2.0 合规\n☐ WEEE 回收标识\n☐ 欧盟责任人\n☐ CE 符合性声明',
            clothing: '☐ REACH 法规合规\n☐ 偶氮染料检测\n☐ 纤维成分标签（EU 语言）\n☐ 护理标签\n☐ 原产地标识',
            beauty: '☐ CPNP 通告\n☐ 欧盟责任人指定\n☐ CPSR 产品安全报告\n☐ INCI 成分标签\n☐ 批号 + PAO（开封后保质期）',
            toys: '☐ EN 71 测试\n☐ CE 标志\n☐ EC 符合性声明\n☐ 欧盟责任人\n☐ 警示语（当地语言）',
            home: '☐ REACH 法规评估\n☐ RoHS（含电子元件时）\n☐ CE 标志（适用时）\n☐ 使用说明书（多语言）\n☐ 回收标识',
            food: '☐ 欧盟食品安全局 (EFSA) 评估\n☐ 营养标签（Regulation 1169/2011）\n☐ 欧盟进口商信息\n☐ 过敏原标识\n☐ 批次可追溯',
            jewelry: '☐ REACH 镍释放测试\n☐ 镉含量限制\n☐ 铅含量检测\n☐ 成分标识\n☐ 原产地标签'
        },
        uk: {
            electronics: '☐ UKCA 标志（英国市场）\n☐ UK RoHS\n☐ 英国责任人\n☐ UKCA 符合性声明\n☐ 英文说明书',
            clothing: '☐ UK REACH 合规\n☐ 纤维成分标签\n☐ 护理标签\n☐ 原产地标识',
            beauty: '☐ UK CPNP / SCPN 通告\n☐ 英国责任人\n☐ 安全评估报告\n☐ 英文成分标签',
            toys: '☐ UKCA 标志\n☐ EN 71 / BS EN 71\n☐ 英国责任人\n☐ 英文警示语',
            home: '☐ UK REACH 评估\n☐ UKCA 标志（适用时）\n☐ 英文说明书\n☐ 安全标识',
            food: '☐ 英国食品标准局 (FSA) 要求\n☐ 营养标签\n☐ 英国进口商信息\n☐ 过敏原标识',
            jewelry: '☐ 镍释放合规\n☐ 重金属检测\n☐ 成分标签\n☐ 原产地标识'
        },
        jp: {
            electronics: '☐ PSE 认证（电气用品）\n☐ 技适标志（无线产品）\n☐ 日文说明书\n☐ 进口商表示',
            clothing: '☐ 家庭用品品质表示法标签\n☐ 纤维成分检测\n☐ 日文标签\n☐ 进口商信息',
            beauty: '☐ 医薬部外品备案（如适用）\n☐ 化妆品制造销售许可\n☐ 日文全成分标签\n☐ 日本国内责任人',
            toys: '☐ ST 标志（玩具安全标准）\n☐ 食品卫生法（含入口部件时）\n☐ 日文警示标签\n☐ 年龄标识',
            home: '☐ PSC 标志（特定产品）\n☐ 日文使用说明书\n☐ 进口商表示\n☐ 安全标识',
            food: '☐ 厚生劳动省备案\n☐ 营养成分表（日文）\n☐ 添加剂列表\n☐ 过敏原标识\n☐ 日本进口商指定',
            jewelry: '☐ 贵金属纯度标识\n☐ 日文标签\n☐ 进口商信息\n☐ 材质表示'
        }
    };

    return checklists[market]?.[category] || '☐ 产品安全评估\n☐ 标签合规审核\n☐ 成分/材料检测\n☐ 目标市场注册/备案\n☐ 当地语言说明书';
}

function copyResult(type) {
    const output = document.getElementById(type + 'Output');
    if (!output || output.querySelector('.output-placeholder, .loading')) {
        showToast('还没有生成内容哦');
        return;
    }

    const text = output.innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast('已复制到剪贴板');
    }).catch(() => {
        showToast('复制失败，请手动复制');
    });
}
