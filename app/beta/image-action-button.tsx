"use client";

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Plus, Trash2 } from "lucide-react";
import React from 'react';


const imageActionVariants = cva(
    "absolute rounded-full p-1 text-white focus:outline-none  focus:ring-2",
    {
        variants: {
            variant: {
                default:
                    "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300",
                destructive:
                    "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300",

            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

export interface ImageActionButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof imageActionVariants> {
    asChild: boolean;

}


const ImageActionButton = ({ variant }: {
    variant: string | undefined
}) => {
    console.log(variant)
    return (
        <button
            className={ cn("absolute bottom-0 right-0 rounded-full p-1 text-white focus:outline-none  focus:ring-2",
                variant ? "bg-red-500 hover:bg-red-600 focus:ring-red-300" : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300"
            )
            }
            name="_intent"
            value={ variant ? 'delete-image' : 'add-image' }
        >
            { variant ? <Trash2
                className='w-4 h-4' /> : <Plus
                className='w-4 h-4' />

            }

        </button>
    )
}


export default ImageActionButton;