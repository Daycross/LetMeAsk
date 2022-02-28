import { useParams } from 'react-router-dom';
import { useState, FormEvent, useEffect} from 'react';

import logoImg from  '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type FirebaseQuestions = Record<string, {
  author: {
    nome: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean
}>

type Question = {
  id: string,
  author: {
    nome: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLighted: boolean
}

type RoomParams = {
  id: string,
}


export function Room(){
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  const roomId = params.id || 'default';

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.once('value', room => {
      const databaseRoom = room.val();
      const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered
        }
      });
      console.log(parsedQuestions);
    })
  },[roomId])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if(newQuestion.trim() === ''){
      return;
    }

    if(!user){
      throw new Error('You must be logged in :(')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img className="logo" src={logoImg} alt="" />
          <RoomCode code={roomId}/>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?" 
            onChange={ event => setNewQuestion(event.target.value) } 
            value={newQuestion}
          />
          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) 
            : (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>) 
            }
            <Button disabled={!user} type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}