"use client";

import { CopyIcon } from 'lucide-react';
import { useState, useCallback, useEffect } from "react";
import { Button } from '../ui/button';

export function CopyButton ({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    }, [text]);

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => {
                setCopied(false);
            }, 2000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [copied]);

    return (
        <Button
            onClick={
                copy
            }
            title="Copy to clipboard"
            className={ ` rounded-sm text-sm text-gray-600 dark:text-gray-400` }
        >
            { copied ? <CopyIcon size={ 18 } /> : <CopyIcon size={ 18 } /> }
        </Button>
    );
}