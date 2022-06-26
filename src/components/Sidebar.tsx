import { useGetLessonsQuery } from "../graphql/generated";
import { Card } from "./Card";


export function Sidebar(){
    const { data } = useGetLessonsQuery()

    return (
        <aside className="w-[348px] h-screen bg-gray-700 border-l border-gray-600 p-6"> 
            <span className="font-bold text-2xl p-6 mb-6 border-b border-gray-500 block">
                Cronograma de Aulas
            </span> 
            
            <div className="flex flex-col gap-8">
                {data?.lessons.map(lesson => {
                    return (
                      <Card 
                        key={lesson.id}
                        title={lesson.title}
                        slug={lesson.slug}
                        avaliableAt={new Date(lesson.availableAt)}
                        type= {lesson.lessonType}
                       />
                    )
                })}
            </div>        
        </aside>
    )
}