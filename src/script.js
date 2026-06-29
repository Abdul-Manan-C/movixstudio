document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon if lucide is initialized
            const icon = menuToggle.querySelector('i');
            if (icon && window.lucide) {
                const isMenu = icon.getAttribute('data-lucide') === 'menu';
                icon.setAttribute('data-lucide', isMenu ? 'x' : 'menu');
                window.lucide.createIcons();
            }
        });

        // Close menu when a link inside is clicked (important for mobile UX anchor links)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon && window.lucide) {
                        icon.setAttribute('data-lucide', 'menu');
                        window.lucide.createIcons();
                    }
                }
            });
        });
    }

    // Liquid Glass Mouse Move Effect
    const glassCards = document.querySelectorAll('.liquid-glass');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Elegant Form Submission Handling
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const originalContent = projectForm.innerHTML;
            
            projectForm.innerHTML = `
                <div class="success-message" style="text-align: center; padding: 3rem 1rem; animation: fadeIn 0.5s ease-out forwards;">
                    <div style="width: 64px; height: 64px; background: rgba(201, 168, 76, 0.1); border: 1px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--accent);">
                        <i data-lucide="check" style="width: 32px; height: 32px;"></i>
                    </div>
                    <h3 style="font-family: var(--font-display); font-size: 24px; font-weight: 300; margin-bottom: 1rem; color: var(--text);">Brief Received</h3>
                    <p style="color: var(--text-muted); font-size: 16px; line-height: 1.6; max-width: 360px; margin: 0 auto 2rem;">Your cinematic directives have been registered. Our lead editor will initiate contact with you within 12 hours.</p>
                    <button id="reset-form-btn" class="btn btn-outline" style="font-size: 14px; padding: 0.6rem 1.5rem; border-color: var(--border);">Submit Another Brief</button>
                </div>
            `;
            
            if (window.lucide) {
                window.lucide.createIcons();
            }
            
            const resetBtn = document.getElementById('reset-form-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    projectForm.innerHTML = originalContent;
                });
            }
        });
    }

    // FAQ Accordion Interactivity
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.closest('.faq-item');
            const isActive = currentItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-trigger');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                currentItem.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Subtle Reading Progress Bar
    const progressBar = document.getElementById('reading-progress-bar');
    if (progressBar) {
        const updateProgressBar = () => {
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
            progressBar.style.width = `${scrollPercent}%`;
        };

        // Initialize progress on load (if page is already scrolled)
        updateProgressBar();

        // Register passive listener for maximum scrolling performance
        window.addEventListener('scroll', updateProgressBar, { passive: true });
    }

    // Dedicated Showreel Section Overlay Interactivity
    const showreelOverlay = document.getElementById('showreel-overlay');
    const mainShowreelVideo = document.getElementById('main-showreel-video');
    if (showreelOverlay && mainShowreelVideo) {
        showreelOverlay.addEventListener('click', () => {
            showreelOverlay.classList.add('faded-out');
            mainShowreelVideo.play().catch(err => console.log('Showreel play error:', err));
        });
        
        mainShowreelVideo.addEventListener('play', () => {
            showreelOverlay.classList.add('faded-out');
        });
    }

    // Agency Showcase Hover autoplay/pause & mute toggle controls
    const showcaseVideos = document.querySelectorAll('.showcase-video');
    showcaseVideos.forEach(video => {
        // Play muted when hovered
        video.addEventListener('mouseenter', () => {
            video.play().catch(err => {
                // Ignore interruption errors
                console.log('Showcase autoplay interrupted:', err);
            });
        });
        
        // Pause when mouse leaves
        video.addEventListener('mouseleave', () => {
            video.pause();
        });
        
        // Mute Toggle button inside the card
        const card = video.closest('.showcase-card');
        if (card) {
            const muteBtn = card.querySelector('.mute-toggle');
            if (muteBtn) {
                muteBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent card-level event triggers
                    video.muted = !video.muted;
                    
                    const icon = muteBtn.querySelector('i');
                    if (icon && window.lucide) {
                        icon.setAttribute('data-lucide', video.muted ? 'volume-x' : 'volume-2');
                        window.lucide.createIcons();
                    }
                });
            }
        }
    });
    
    // Intersection Observer for Bento Grid Scroll Reveal
    const revealItems = document.querySelectorAll('.reveal-on-scroll');
    if (revealItems.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px' // triggers slightly before entry to look smooth
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const delay = item.getAttribute('data-delay') || '0';
                    setTimeout(() => {
                        item.classList.add('revealed');
                    }, parseInt(delay, 10));
                    revealObserver.unobserve(item);
                }
            });
        }, observerOptions);

        revealItems.forEach((item) => {
            revealObserver.observe(item);
        });
    }

    // Copy Email to Clipboard Interaction
    const copyEmailButtons = document.querySelectorAll('.copy-email-trigger');
    copyEmailButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const email = btn.getAttribute('data-email') || 'collaborate@movixstudio.com';
            const tooltip = btn.querySelector('.copy-tooltip');
            const icon = btn.querySelector('i');
            
            try {
                await navigator.clipboard.writeText(email);
                
                // Show copied status
                if (tooltip) {
                    tooltip.textContent = 'Copied!';
                }
                btn.classList.add('show-tooltip');
                
                // Change icon to check
                if (icon && window.lucide) {
                    icon.setAttribute('data-lucide', 'check');
                    window.lucide.createIcons();
                }
                
                // Reset after 2000ms
                setTimeout(() => {
                    btn.classList.remove('show-tooltip');
                    setTimeout(() => {
                        if (tooltip) {
                            tooltip.textContent = 'Copy';
                        }
                    }, 150); // let fade-out finish before resetting text
                    if (icon && window.lucide) {
                        icon.setAttribute('data-lucide', 'copy');
                        window.lucide.createIcons();
                    }
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy email:', err);
                if (tooltip) {
                    tooltip.textContent = 'Failed';
                }
                btn.classList.add('show-tooltip');
                setTimeout(() => {
                    btn.classList.remove('show-tooltip');
                    setTimeout(() => {
                        if (tooltip) {
                            tooltip.textContent = 'Copy';
                        }
                    }, 150);
                }, 2000);
            }
        });
    });

    // ==========================================
    // Interactive Portfolio Category Filters
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const showcaseCards = document.querySelectorAll('.showcase-card');

    if (filterButtons.length > 0 && showcaseCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active filter button class
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                showcaseCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('filtered-out');
                        card.style.display = 'block';
                        // Trigger simple transition re-flow
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('filtered-out');
                        // Fade out elegantly
                        card.style.opacity = '0.15';
                        card.style.transform = 'scale(0.96)';
                    }
                });
            });
        });
    }

    // ==========================================
    // Retention Simulator Engine
    // ==========================================
    const layerToggles = document.querySelectorAll('.control-toggle-card');
    if (layerToggles.length > 0) {
        layerToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                updateRetentionSimulation();
            });
        });

        // Setup the Simulation calculation
        function updateRetentionSimulation() {
            const hook = document.querySelector('[data-layer="hook"]').classList.contains('active');
            const sfx = document.querySelector('[data-layer="sfx"]').classList.contains('active');
            const subtitles = document.querySelector('[data-layer="subtitles"]').classList.contains('active');
            const color = document.querySelector('[data-layer="color"]').classList.contains('active');

            // Interactive Video Elements
            const previewHook = document.getElementById('preview-hook');
            const previewSubtitles = document.getElementById('preview-subtitles');
            const previewColor = document.getElementById('preview-color');
            const previewSfx = document.getElementById('preview-sfx');

            if (previewHook) {
                previewHook.style.opacity = hook ? '1' : '0';
                previewHook.style.transform = hook ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.6)';
            }
            if (previewSubtitles) {
                previewSubtitles.style.opacity = subtitles ? '1' : '0';
                previewSubtitles.style.transform = subtitles ? 'translateY(0)' : 'translateY(10px)';
            }
            if (previewColor) {
                previewColor.style.opacity = color ? '1' : '0';
            }
            if (previewSfx) {
                previewSfx.style.opacity = sfx ? '1' : '0';
            }

            // Graph points mapping
            const p0_x = 0;
            const p0_y = hook ? 30 : 95;
            const p1_x = 50;
            const p1_y = hook ? 40 : 120;

            let p2_y = 160;
            if (subtitles && color) p2_y = 75;
            else if (subtitles) p2_y = 100;
            else if (color) p2_y = 130;

            let p3_y = 185;
            if (sfx && hook) p3_y = 90;
            else if (sfx) p3_y = 130;
            else if (hook) p3_y = 150;

            // Render custom path in SVG coordinates
            const dStr = `M ${p0_x},${p0_y} L ${p1_x},${p1_y} Q 150,${(p1_y + p2_y) / 2} 250,${p2_y} T 500,${p3_y} L 500,200 L 0,200 Z`;
            const pathNode = document.getElementById('retention-curve-path');
            if (pathNode) {
                pathNode.setAttribute('d', dStr);
            }

            // Position small anchor nodes over the path
            const cHook = document.getElementById('chart-point-hook');
            const cMid = document.getElementById('chart-point-mid');
            const cEnd = document.getElementById('chart-point-end');
            if (cHook) { cHook.setAttribute('cx', '50'); cHook.setAttribute('cy', p1_y.toString()); }
            if (cMid) { cMid.setAttribute('cx', '250'); cMid.setAttribute('cy', p2_y.toString()); }
            if (cEnd) { cEnd.setAttribute('cx', '450'); cEnd.setAttribute('cy', p3_y.toString()); }

            // Score Metric computation
            let score = 25;
            if (hook) score += 20;
            if (sfx) score += 15;
            if (subtitles) score += 18;
            if (color) score += 12;
            if (hook && sfx && subtitles && color) score = 88; // Peak optimization bonus

            const calculatedDuration = (30 * (score / 100)).toFixed(1);
            let viralityFactor = 'LOW';
            if (score >= 80) viralityFactor = 'EXTREME';
            else if (score >= 60) viralityFactor = 'HEALTHY';
            else if (score >= 45) viralityFactor = 'MODERATE';

            const txtRetain = document.getElementById('metric-retain');
            const txtDuration = document.getElementById('metric-duration');
            const txtVirality = document.getElementById('metric-virality');

            if (txtRetain) txtRetain.textContent = `${score}%`;
            if (txtDuration) txtDuration.textContent = `${calculatedDuration}s`;
            if (txtVirality) {
                txtVirality.textContent = viralityFactor;
                if (viralityFactor === 'EXTREME') txtVirality.style.color = 'var(--accent)';
                else if (viralityFactor === 'HEALTHY') txtVirality.style.color = '#27C93F';
                else if (viralityFactor === 'MODERATE') txtVirality.style.color = '#FFBD2E';
                else txtVirality.style.color = '#FF5F56';
            }
        }

        // Run initial simulation calculation on mount
        updateRetentionSimulation();
    }

    // ==========================================
    // Advanced Pricing Toggles, Currency & Calculator
    // ==========================================
    let currentCurrency = 'USD'; // 'USD' or 'PKR'
    const EXCHANGE_RATE = 292.55;

    // 1. Pricing Mode Toggling (Packages vs Custom Calculator)
    const modeButtons = document.querySelectorAll('.pricing-mode-btn');
    const pricingViews = document.querySelectorAll('.pricing-view');

    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedMode = btn.getAttribute('data-mode');
            pricingViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === `pricing-${selectedMode}-view`) {
                    view.classList.add('active');
                }
            });
        });
    });

    // 2. Standard Gig Package Tabs (Longform vs Shortform)
    const gigTabBtns = document.querySelectorAll('.gig-tab-btn');
    const gigPanels = document.querySelectorAll('.gig-panel');

    gigTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gigTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedGig = btn.getAttribute('data-gig');
            gigPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `gig-${selectedGig}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // 3. Currency Switch Toggle
    const currencyToggleBtn = document.getElementById('currency-toggle-btn');
    const labelUsd = document.getElementById('currency-label-usd');
    const labelPkr = document.getElementById('currency-label-pkr');

    if (currencyToggleBtn) {
        currencyToggleBtn.addEventListener('click', () => {
            if (currentCurrency === 'USD') {
                currentCurrency = 'PKR';
                currencyToggleBtn.classList.add('pkr-active');
                if (labelUsd) labelUsd.classList.remove('active');
                if (labelPkr) labelPkr.classList.add('active');
            } else {
                currentCurrency = 'USD';
                currencyToggleBtn.classList.remove('pkr-active');
                if (labelUsd) labelUsd.classList.add('active');
                if (labelPkr) labelPkr.classList.remove('active');
            }
            updateCurrencyUI();
        });
    }

    function updateCurrencyUI() {
        // Update Standard Package Cards Prices
        const currencySymbols = document.querySelectorAll('.p-currency');
        const priceAmounts = document.querySelectorAll('.p-amount');

        currencySymbols.forEach(sym => {
            const usdSym = sym.getAttribute('data-usd') || '$';
            const pkrSym = sym.getAttribute('data-pkr') || '₨';
            sym.textContent = currentCurrency === 'USD' ? usdSym : pkrSym;
        });

        priceAmounts.forEach(amt => {
            const usdVal = amt.getAttribute('data-usd');
            const pkrVal = amt.getAttribute('data-pkr');
            amt.textContent = currentCurrency === 'USD' ? usdVal : pkrVal;
        });

        // Update Custom Calculator price annotations
        const addonLabels = document.querySelectorAll('.addon-price-label');
        addonLabels.forEach(label => {
            const card = label.closest('.addon-checkbox-card');
            if (card) {
                const usdPrice = parseInt(card.getAttribute('data-price'), 10);
                if (currentCurrency === 'USD') {
                    if (card.getAttribute('data-addon') === 'express') {
                        label.textContent = `Guaranteed priority rendering queue (+ $100 / video)`;
                    } else if (card.getAttribute('data-addon') === 'source') {
                        label.textContent = `Full project package handover with assets (+ $50 / video)`;
                    } else {
                        label.textContent = `Translation and .SRT formatting (+ $25 / video)`;
                    }
                } else {
                    const pkrPrice = Math.round(usdPrice * EXCHANGE_RATE);
                    if (card.getAttribute('data-addon') === 'express') {
                        label.textContent = `Guaranteed priority rendering queue (+ ₨ ${pkrPrice.toLocaleString()} / video)`;
                    } else if (card.getAttribute('data-addon') === 'source') {
                        label.textContent = `Full project package handover with assets (+ ₨ ${pkrPrice.toLocaleString()} / video)`;
                    } else {
                        label.textContent = `Translation and .SRT formatting (+ ₨ ${pkrPrice.toLocaleString()} / video)`;
                    }
                }
            }
        });

        // Update Custom Calculator Calculation
        calculateRetainerPrice();
    }

    // 4. Interactive Custom Retainer Calculator
    const volumeSlider = document.getElementById('volume-slider');
    const formatButtons = document.querySelectorAll('.format-option');
    const addonCards = document.querySelectorAll('.addon-checkbox-card');

    if (volumeSlider) {
        volumeSlider.addEventListener('input', calculateRetainerPrice);
        
        formatButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                formatButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                calculateRetainerPrice();
            });
        });

        addonCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('active');
                calculateRetainerPrice();
            });
        });

        function calculateRetainerPrice() {
            const currentFormatBtn = document.querySelector('.format-option.active');
            const selectedFormat = currentFormatBtn ? currentFormatBtn.getAttribute('data-format') : 'social';
            const volume = parseInt(volumeSlider.value, 10);

            // Update Volume visual readout
            const volReadout = document.getElementById('volume-readout');
            if (volReadout) {
                volReadout.textContent = `${volume} Video${volume > 1 ? 's' : ''} / Month`;
            }

            // Baseline Cost Setup (USD)
            let costPerVideo = 40; // social / vertical
            if (selectedFormat === 'youtube') costPerVideo = 80;
            if (selectedFormat === 'brand') costPerVideo = 200;

            // Volume Scaling Discounts
            let discountMultiplier = 1.0;
            if (volume >= 4 && volume <= 7) discountMultiplier = 0.90; // 10% discount
            else if (volume >= 8 && volume <= 12) discountMultiplier = 0.85; // 15% discount
            else if (volume >= 13) discountMultiplier = 0.80; // 20% discount

            // Addon Price Calculation (USD)
            let addonsSum = 0;
            const activeAddonsList = [];
            addonCards.forEach(card => {
                if (card.classList.contains('active')) {
                    const price = parseInt(card.getAttribute('data-price'), 10);
                    addonsSum += price;
                    activeAddonsList.push(card.getAttribute('data-addon'));
                }
            });

            // Calculate final pricing
            const discountedVideoCost = costPerVideo * discountMultiplier;
            const totalMonthlyUSD = Math.round((discountedVideoCost + addonsSum) * volume);

            // Output Currency Symbol and Amount
            const currencyEl = document.getElementById('calc-currency');
            const priceEl = document.getElementById('calculated-total');

            if (currencyEl && priceEl) {
                if (currentCurrency === 'USD') {
                    currencyEl.textContent = '$';
                    priceEl.textContent = totalMonthlyUSD.toLocaleString();
                } else {
                    currencyEl.textContent = '₨ ';
                    const totalMonthlyPKR = Math.round(totalMonthlyUSD * EXCHANGE_RATE);
                    priceEl.textContent = totalMonthlyPKR.toLocaleString();
                }
            }

            // Render Savings Notification
            const savingsBanner = document.getElementById('savings-banner');
            const savingsPctEl = document.getElementById('savings-pct');
            if (savingsBanner && savingsPctEl) {
                if (discountMultiplier < 1.0) {
                    const savedPct = Math.round((1 - discountMultiplier) * 100);
                    savingsPctEl.textContent = savedPct.toString();
                    savingsBanner.style.display = 'flex';
                } else {
                    savingsBanner.style.display = 'none';
                }
            }

            // Live Sync Dynamic Hire URL with query parameters
            const calcHireBtn = document.getElementById('calc-hire-btn');
            if (calcHireBtn) {
                const queryStr = `format=${selectedFormat}&volume=${volume}&addons=${activeAddonsList.join(',')}&currency=${currentCurrency}`;
                calcHireBtn.setAttribute('href', `/contact.html?${queryStr}`);
            }
        }

        // Initialize calculation
        calculateRetainerPrice();
    }

    // ==========================================
    // Pre-fill Brief Form (Runs on Contact Page)
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const paramFormat = urlParams.get('format');
    const paramVolume = urlParams.get('volume');
    const paramAddons = urlParams.get('addons');

    if (paramFormat || paramVolume || paramAddons) {
        const typeSelect = document.getElementById('type');
        const messageText = document.getElementById('message');

        if (typeSelect) {
            if (paramFormat === 'social') {
                typeSelect.value = 'social';
            } else if (paramFormat === 'brand') {
                typeSelect.value = 'commercial';
            } else {
                typeSelect.value = 'documentary';
            }
        }

        if (messageText) {
            let addText = `Hello! I would like to initiate a custom video retainer plan with the following specifications:\n\n`;
            
            let formatLabel = paramFormat === 'social' ? 'Vertical Content (9:16 Shorts/Reels)' : (paramFormat === 'youtube' ? 'YouTube / Vlogs (16:9 Longform)' : 'Commercial Brand Films & Promos');
            addText += `- Content Format: ${formatLabel}\n`;
            addText += `- Target Volume: ${paramVolume || 4} videos per month\n`;
            
            if (paramAddons) {
                const addNames = paramAddons.split(',').map(a => {
                    if (a === 'express') return 'Express 48-Hour Turnaround';
                    if (a === 'source') return 'Project Files Handover';
                    if (a === 'subtitles') return 'Multi-Language Caption Files';
                    return a;
                });
                addText += `- Selected Priority Addons: ${addNames.join(', ')}\n`;
            }
            addText += `\nPlease send through the agreement details so we can initiate the edit queue.`;
            messageText.value = addText;
        }
    }

    // Initialize Lucide Icons if loaded
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
