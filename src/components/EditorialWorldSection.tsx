import { useEffect, useState } from 'react'

const worldCards = [
  {
    no: '01',
    title: 'about me',
    body: 'the person behind this portfolio',
    href: '#about',
    className: 'left-[31%] top-[30%] rotate-[-2deg]',
    text: { left: 40, top: 35, width: 160 },
    textRotate: 0,
    paperScale: 0.9,
    paperRotate: 0,
  },
  {
    no: '',
    title: 'currently',
    body: '◎ building cool things\n◎ learning every day\n◎ drinking too much coffee',
    href: '#',
    className: 'left-[6%] top-[48%] rotate-[-10deg]',
    text: { left: 60, top: 30, width: 250 },
    textRotate: -15,
    paperScale: 1.1,
    paperRotate: -10,
    paper: '/currently_paper.png',
    isCurrently: true,
  },
  {
    no: '04',
    title: 'projects',
    body: "things i've built",
    href: '#projects',
    className: 'left-[30%] top-[56%] rotate-[-20deg]',
    text: { left: 48, top: 50, width: 160 },
    textRotate: 0,
    paperScale: 0.8,
    paperRotate: 0,
  },
  {
    no: '03',
    title: 'education',
    body: 'my academic background',
    href: '#about',
    className: 'right-[15%] top-[21%] rotate-[-15deg]',
    text: { left: 35, top: 35, width: 160 },
    textRotate: 0,
    paperScale: 1,
    paperRotate: 0,
  },
  {
    no: '02',
    title: 'experience',
    body: 'internships & work experience',
    href: '#projects',
    className: 'left-[50%] top-[20%] rotate-[2deg]',
    text: { left: 28, top: 28, width: 140 },
    textRotate: 0,
    paperScale: 0.95,
    paperRotate: 1.5,
  },
  {
    no: '07',
    title: 'skills',
    body: 'technologies and tools',
    href: '#skills',
    className: 'right-[9%] bottom-[5%] rotate-[4deg]',
    text: { left: 36, top: 38, width: 160 },
    textRotate: 0,
    paperScale: 1.5,
    paperRotate: 0,
  },
  {
    no: '06',
    title: 'photos',
    body: 'moments i capture',
    href: '#photography',
    className: 'left-[49%] bottom-[3%] rotate-[-2deg]',
    text: { left: 30, top: 47, width: 170 },
    textRotate: 0,
    paperScale: 1.5,
    paperRotate: 0,
  },
  {
    no: '05',
    title: 'playlist',
    body: 'what i listen to while coding',
    href: '#playlist',
    className: 'left-[17%] bottom-[3%] rotate-[5deg]',
    text: { left: 38, top: 48, width: 120 },
    textRotate: -5,
    paperScale: 1.15,
    paperRotate: 0,
  },
]

const paperMap: Record<string, string> = {
  '01': '/about_paper.png',
  '02': '/experience_paper.png',
  '03': '/education_paper.png',
  '04': '/projects_paper.png',
  '05': '/playlist_paper.png',
  '06': '/photo_paper.png',
  '07': '/skills_paper.png',
}

const EditorialWorldSection = () => {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat('en-CA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Vancouver',
    }).format(new Date()),
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(
        new Intl.DateTimeFormat('en-CA', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'America/Vancouver',
        }).format(new Date()),
      )
    }, 1000)

    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      id="world"
      className="relative min-h-screen overflow-hidden text-[#171818]"
    >
      {/* WRINKLY PAPER BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="/wrinkly_background.png"
          alt=""
          className="h-full w-full object-cover opacity-[1]"
          draggable={false}
        />
      </div>
      
      <div className="pointer-events-none absolute inset-0 opacity-[0.38] [background-image:radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08)_0_1px,transparent_1px),linear-gradient(135deg,rgba(255,255,255,0.45),transparent_40%)] [background-size:18px_18px,100%_100%]" />

      <div className="relative mx-auto h-screen min-h-[720px] max-w-[1536px] px-10 py-8">
        <h1
          className="absolute left-12 top-[70px] z-20 rotate-[-10deg] text-[150px] uppercase leading-[0.78] tracking-[-0.04em] text-[#ec4002] lg:text-[140px]"
          style={{ fontFamily: "'Art Post Black', Impact, sans-serif" }}
        >
          My
          <br />
          World
        </h1>

        {/* DESK POLAROID */}
        <div className="absolute left-[37%] top-[35%] z-10">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-[2deg] bg-[#c96b45]/12 blur-[2px]" />

          <div className="relative rotate-[-1.5deg] bg-[#f7f1e8] p-[18px] shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
            <div className="absolute -top-5 left-10 h-8 w-28 rotate-[-10deg] bg-[#d8c09a]/70 backdrop-blur-sm" />
            <div className="absolute -top-4 right-14 h-8 w-20 rotate-[12deg] bg-[#d8c09a]/60 backdrop-blur-sm" />

            <div className="relative h-[450px] w-[760px] overflow-hidden bg-[#ead8ca]">
              <img
                src="/world-desk-halftone.png"
                alt="Marco coding desk illustration"
                className="h-full w-full object-cover mix-blend-multiply contrast-[1.08] saturate-[0.8]"
              />

              <div className="pointer-events-none absolute inset-0 bg-[#ec4002]/[0.05]" />
            </div>
          </div>
        </div>

        {/* PHOTO */}
        <div className="absolute left-[37%] top-[8%] z-20 h-[180px] w-[150px] rotate-[-6deg] bg-white p-2 shadow-[0_16px_30px_rgba(0,0,0,0.18)]">
          <div className="absolute -top-4 left-6 h-8 w-28 rotate-[-8deg] bg-[#d9bf93]/65" />

          <div className="h-full w-full overflow-hidden bg-[#f3eee6]">
            <img
              src="/logo.png"
              alt="Marco logo"
              className="h-full w-full object-cover mix-blend-multiply"
              draggable={false}
            />
          </div>
        </div>

        {/* PAPER CARDS */}
        {worldCards.map((card, index) => (
          <a
            key={`${card.title}-${index}`}
            href={card.href}
            className={`group absolute z-30 transition-transform duration-300 hover:-translate-y-2 ${card.className}`}
            style={{
              width: card.isCurrently ? '350px' : '220px',
              height: card.isCurrently ? '230px' : '220px',
            }}
          >
            <img
              src={card.paper || paperMap[card.no] || '/paper_base.png'}
              alt=""
              className="pointer-events-none absolute left-0 top-0 h-full w-full select-none object-contain"
              style={{
                transform: `scale(${card.paperScale}) rotate(${card.paperRotate}deg)`,
              }}
              draggable={false}
            />

            <div
              className="absolute z-10"
              style={{
                left: `${card.text.left}px`,
                top: `${card.text.top}px`,
                width: `${card.text.width}px`,
                transform: `rotate(${card.textRotate}deg)`,
              }}
            >
              {!card.isCurrently && (
                <span className="text-[25px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#ec4002]">
                  {card.no}
                </span>
              )}

              <h3
                className={`leading-[0.95] tracking-[-0.05em] ${
                  card.isCurrently
                    ? 'text-[34px] font-semibold text-[#ec4002]'
                    : 'mt-2 text-[34px] font-semibold lowercase text-[#171818]'
                }`}
              >
                {card.title}
              </h3>

              {card.isCurrently ? (
                <div className="mt-5 space-y-3 text-[16px] font-semibold leading-[1.05] tracking-[-0.05em] text-[#171818]">
                  {card.body.split('\n').map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-[18px] font-semibold leading-[1.15] tracking-[-0.05em] text-[#171818]/80">
                  {card.body}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default EditorialWorldSection