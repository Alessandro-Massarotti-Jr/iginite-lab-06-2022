import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LessonProps {
    title: String;
    slug: String;
    availableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {

    const { slug } = useParams<{ slug: string }>();

    const isLessonAvailable = isPast(props.availableAt);
    const availableAtFormated = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'K'h'mm", {
        locale: ptBr
    })

    const isActiveLesson = slug == props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span className="text-gray-300">
                {availableAtFormated}
            </span>
            <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                'bg-green-500': isActiveLesson
            })}>
                <header className="flex items-center justify-between">
                    {isLessonAvailable ?
                        <span className={classNames('text-sm text-blue-500 font-medium flex items-center gap-2', {
                            'text-white': isActiveLesson,
                        })}>
                            <CheckCircle size={20} />
                            Conteudo liberado
                        </span>
                        :
                        <span className='text-sm text-orange-500 font-medium flex items-center gap-2'>
                            <Lock size={20} />
                            Breve
                        </span>
                    }
                    <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold',{
                     'border-white':isActiveLesson,
                     'border-green-500':!isActiveLesson
                    })}>
                        {props.type === 'live' ? 'Ao vivo' : 'Aula pratica'}
                    </span>
                </header>
                <strong className={classNames(' mt-5 block', {
                    'text-white': isActiveLesson,
                    'text-gray-200': !isActiveLesson
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    );
}