import { memo } from 'react';
import './style.css';

export const FixedBackground = memo(function FixedBackground() {
    return (
        <div className="fixed-background">
            {/* Background Layers */}
            <div className="app-bg">
                <div className="app-bg-top-left" />
                <div className="app-bg-bottom-right" />
                <div className="app-bg-center" />
            </div>
        </div>
    );
});