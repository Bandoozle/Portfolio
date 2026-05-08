import PersonalLayer from './components/personal/PersonalLayer'

type AppProps = {
  /** When set (e.g. from layered portfolio), shows header back control to return to the professional layer. */
  onBackToProfessional?: () => void
}

function App({ onBackToProfessional }: AppProps) {
  return (
    <div className="relative box-border h-[100dvh] max-h-[100dvh] overflow-hidden bg-black p-3 sm:p-5 md:p-7">
      <PersonalLayer onBackToProfessional={onBackToProfessional} />
    </div>
  )
}

export default App
