import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MainSideBar from '@/components/layout/mainSideBar/MainSideBar'
import MainNavBar from '@/components/layout/mainNavBar/MainNavBar'
import Providers from '@/components/redux/Providers'
import MainHeader from '@/components/layout/mainHeader/MainHeader'
import ScrollTo from '@/components/layout/mainNavBar/ScrollTo'
import Search from '@/components/element/search/Search'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Koit Blog',
  description: 'Web개발을 공부하며 습득해온 지식들을 정리해둔 나만의 블로그 ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <html lang="ko" className="box-border overflow-x-hidden">
      <body
        className={`${inter.className} relative flex`}
        suppressHydrationWarning
      >
        <Providers className="flex">
          <MainSideBar
            maxWidth={"w-[15rem]"}
            className={
              "fixed z-[999] h-[100vh] transition-[width] duration-300"
            }
          />
          <main className="w-[100vw] h-full 2xl:pl-[14.5rem] 2xl:pr-[1rem] bg-slate-700">
            <nav className="fixed z-50 items-center w-[100vw] h-14 p-6">
              <MainNavBar />
              <ScrollTo />
            </nav>
            <header className="relative h-[65vh] min-h-[1000px] pb-[35vh]">
              <article className="z-[20] absolute w-full">
                <MainHeader />
              </article>
              <article className="z-[40] absolute flex justify-center w-full pt-[17rem]">
                <div className='w-[15rem]'>
                  <Search />
                </div>
              </article>
            </header>
            <section className="w-full">
              {children}
            </section>
            <footer>
              <div className="w-[100vw] h-[12rem] bg-slate-800">1</div>
            </footer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
