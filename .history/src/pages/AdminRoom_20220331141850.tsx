import { useParams, useNavigate } from 'react-router-dom';

import logoImg from  '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImage from '../assets/images/check.svg';
import answerImage from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss';
// import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
  id: string,
}


export function AdminRoom(){
  // const { user } = useAuth();
  const navigate = useNavigate();

  const params = useParams<RoomParams>();
  const roomId = params.id || 'default';

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    navigate('/');
  }

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighLightQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img className="logo" src={logoImg} alt="" />
          <div>
            <RoomCode code={roomId}/>
            <Button 
              isOutlined 
              onClick={handleEndRoom}>Encerrar Sala
            </Button>
          </div>
          

        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button type='button' onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                  <img src={checkImage} alt="Marcar pergunta como respondida" />
                </button>
                <button type='button' onClick={() => handleHighLightQuestion(question.id)}>
                  <img src={answerImage} alt="Dar destaque à pergunta" />
                </button>
                <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}