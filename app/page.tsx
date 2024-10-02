import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { count } from 'console';
import { FileText } from 'lucide-react';
import Image from "next/image";

export default function Home () {
  return (
    <section
      className='mt-4'
    >
      <h2
        className='flex justify-center text-3xl font-bold'>
        Welcome to the Next.js + TypeScript + Tailwind CSS Starter
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total posts
            </CardTitle>
            <FileText />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              1445
            </div>
            <p className="text-xs text-muted-foreground">
              perhaps add increase or decrease from
              last month
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

