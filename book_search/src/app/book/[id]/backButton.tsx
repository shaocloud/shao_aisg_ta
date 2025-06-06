'use client'

import { ArrowLeftIcon } from '@primer/octicons-react';

/**
 * Clientside back button
 *
 * @component
 * @returns Rendered BackButton component
 */
export default function BackButton() {
    const handleBack = () => {
        if (typeof window !== 'undefined') {
            window.history.back();
        }
    };

    return (
        <button 
            onClick={handleBack}
            className="btn btn-ghost btn-sm mb-4 self-start"
        >
            <ArrowLeftIcon />
            Back
        </button>
    );
}