import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

export function Home(){
  return (
    <div>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
        <main>
          <div>
            <img src={logoImg} alt="Letmeask" />
          </div>
        </main>
      </aside>
    </div>
  );
}