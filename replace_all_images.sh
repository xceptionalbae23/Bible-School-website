#!/bin/bash

echo "Updating all Emergent image URLs to local paths..."

# Navigation.js - logo
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/e7r218wc_WhatsApp%20Image%202025-09-18%20at%2020.48.07.jpeg|/images/logo/main-logo.jpeg|g' frontend/src/components/Navigation.js

# HomePage.js - multiple images
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/xs9o2jk0_WhatsApp%20Image%202025-09-22%20at%2014.47.50.jpeg|/images/home/hero-image.jpeg|g' frontend/src/components/HomePage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/twk1zmgg_WhatsApp%20Image%202025-10-05%20at%2013.26.27.jpeg|/images/home/gallery1.jpeg|g' frontend/src/components/HomePage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/uehvcmoy_WhatsApp%20Image%202025-10-08%20at%2005.37.57.jpeg|/images/home/gallery2.jpeg|g' frontend/src/components/HomePage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/f4xxl94c_WhatsApp%20Image%202025-09-13%20at%2008.07.04.jpeg|/images/home/gallery3.jpeg|g' frontend/src/components/HomePage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/05ismsdm_WhatsApp%20Image%202025-09-13%20at%2011.51.07.jpeg|/images/home/gallery4.jpeg|g' frontend/src/components/HomePage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/d6ool4lq_WhatsApp%20Image%202025-09-13%20at%2011.49.35.jpeg|/images/home/gallery5.jpeg|g' frontend/src/components/HomePage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/vzia377c_WhatsApp%20Image%202025-09-25%20at%2011.59.14.jpeg|/images/home/gallery6.jpeg|g' frontend/src/components/HomePage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/uiyjgsoc_WhatsApp%20Image%202025-09-25%20at%2012.01.19.jpeg|/images/home/gallery7.jpeg|g' frontend/src/components/HomePage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/x2bykhnu_WhatsApp%20Image%202025-09-13%20at%2008.07.06.jpeg|/images/home/gallery8.jpeg|g' frontend/src/components/HomePage.js

# AboutPage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/f4xxl94c_WhatsApp%20Image%202025-09-13%20at%2008.07.04.jpeg|/images/about/about1.jpeg|g' frontend/src/components/AboutPage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/auovrnk7_WhatsApp%20Image%202025-09-22%20at%2013.40.27.jpeg|/images/about/about2.jpeg|g' frontend/src/components/AboutPage.js

# GalleryPage.js
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/bfh42jg9_WhatsApp%20Image%202025-09-13%20at%2012.46.11.jpeg|/images/gallery/gallery-featured.jpeg|g' frontend/src/components/GalleryPage.js

# Footer.js - logo
sed -i '' 's|https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/e7r218wc_WhatsApp%20Image%202025-09-18%20at%2020.48.07.jpeg|/images/logo/main-logo.jpeg|g' frontend/src/components/Footer.js

echo "✅ All image paths updated!"
