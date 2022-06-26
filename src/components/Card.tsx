import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames'

interface LessonProps {
  title: string;
  slug: string;
  avaliableAt: Date;
  type: 'live' | 'class';
}


export function Card(props: LessonProps) {
  const isAvaliable = isPast(props.avaliableAt)
  const isAvaliableFormatted = format(props.avaliableAt, "EEEE' • ' d ' de 'MMMM ' • 'k'h'mm", {
    locale: ptBR,
  })

  const { slug } = useParams<{ slug: string }>()

  const isActiveLesson = props.slug === slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">
        {isAvaliableFormatted}
      </span>

      <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors', {
        'bg-green-500': isActiveLesson
      })}>

        <header className="flex items-center justify-between">
          {isAvaliable ? (
            <span className={classNames("text-sm font-medium flex gap-2", {
              'text-blue-500': !isActiveLesson,
              'text-white': isActiveLesson
            })}>
              <CheckCircle size={20} /> Conteúdo Liberado
            </span>
          ) : (
            <span className="text-orange-500 text-sm font-medium flex gap-2">
              <Lock size={20} /> Em Breve
            </span>
          )}

          <span className={classNames("border rounded border-green-300 text-xs text-white font-bold px-2 py-[0.125rem]", {
            'border-white': isActiveLesson
          })}>
            {props.type === "live" ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={classNames("mt-5 block", {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
        })}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}