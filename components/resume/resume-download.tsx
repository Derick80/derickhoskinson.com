'use client'
import { Download } from 'lucide-react'
import { Button } from '../ui/button'
import React from 'react'

type ASTResume = {
    type: string
    value?: string
    children?: ASTResume[]
}

const DownloadResumeButton = () => {
    const downloadPDF = () => {
        // Add a temporary stylesheet for printing
        const style = document.createElement('style')
        style.textContent = `
      @media print {
        body * {
          visibility: hidden;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        #resume-content, #resume-content * {
          visibility: visible;
        }
        #resume-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        @page {
          size: A4;
          margin: 20mm;
        }

      }
    `
        document.head.appendChild(style)

        // Trigger print dialog
        window.print()

        // Remove the temporary stylesheet after printing
        document.head.removeChild(style)
    }
    return (
        <Button
            variant='outline'
            size='sm'
            onClick={downloadPDF}
            className='text-xs'
        >
            <Download className='mr-1 h-4 w-4' />
            PDF
        </Button>
    )
}

export default DownloadResumeButton
