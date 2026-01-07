import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingButtons from '@/components/layout/FloatingButtons'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 md:pt-32">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}

