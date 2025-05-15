import { FormEvent, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
const serverUrl = import.meta.env.VITE_SERVER_URL;
const socket = io(serverUrl);


interface Message {
  message: string;
  senderId: string;
}

export default function App() {
  const [recivedMessage, setRecivedMessage] = useState<Message[]>([])
  const [myId, setMyId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    socket.on('connect', () => {
      const id = socket.id;
      if (id) {
        setMyId(id);
      }
    });

    socket.on('message', (message) => {
      setRecivedMessage((prev) => [...prev, message]);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [recivedMessage]);


  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { inputMessage } = event.currentTarget;
    const message = inputMessage.value.trim();
    if (message) {
      socket.emit('message', message);
      inputMessage.value = '';
    }
  };

  return (
    <main className='bg-zinc-800 text-white p-8 min-h-dvh flex items-center justify-center'>
      <section className='bg-zinc-700 w-[80dvw] h-[calc(100dvh-4rem)] flex flex-col justify-between rounded-md'>
        <section className='p-8 flex flex-col gap-4 overflow-y-scroll' ref={scrollRef}>
          {recivedMessage.map(({ message, senderId }, index) => (
            <p
              key={`${senderId}-${index}`}
              className={`w-fit p-2 rounded-md ${senderId === myId ? 'self-end bg-blue-950' : 'self-start bg-gray-900'}`}
            >
              {message}
            </p>
          ))}
        </section>
        <form onSubmit={sendMessage} className='flex'>
          <input
            type="text"
            placeholder='Type a message...'
            name='inputMessage'
            className='p-3 outline-0 bg-zinc-600 flex-1 rounded-bl-sm'
          />
          <button type="submit" className='px-8 py-2 bg-zinc-950 cursor-pointer rounded-br-sm'>Enviar</button>
        </form>
      </section>
    </main>
  );
}
