import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const SEO = () => {
    const settings = useSelector((state) => state.settings.data);

    useEffect(() => {
        document.title = settings?.websiteName || process.env.REACT_APP_NAME || 'Member Management System';

        if (settings?.favicon) {
            let faviconLink = document.querySelector("link[rel~='icon']");
            if (!faviconLink) {
                faviconLink = document.createElement('link');
                faviconLink.rel = 'icon';
                document.head.appendChild(faviconLink);
            }
            faviconLink.href = settings.favicon;
        }
    }, [settings]);

    return null;
};

export default SEO;
