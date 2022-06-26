import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubsMutation } from "../graphql/generated";

export function Subscribe() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigator = useNavigate()
    
    const [createsubs, {loading}] = useCreateSubsMutation({
        variables: {
            name, 
            email
        }
    })

  async function handleEvent(event: FormEvent) {
        event.preventDefault()

       await createsubs()

        navigator('/event')
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex justify-between items-center mt-20 mx-auto">
                <div className="max-w-[640px]">
                    <Logo />
                    <h1 className=" mt-8 text-4xl leading-tight">Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, <strong className="text-blue-500">com React</strong></h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.</p>
                </div>
                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Insreva-se Gratuitamente!</strong>
                    <form onClick={handleEvent} className="flex flex-col gap-2 w-full">
                        <input
                            className="bg-gray-700 rounded px-5 h-14"
                            type="text"
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            className="bg-gray-700 rounded px-5 h-14"
                            type="email"
                            placeholder="Digite seu E-mail"
                            onChange={event => setEmail(event.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-green-500 py-4 uppercase font-bold text-sm rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Garantir minha vaga
                        </button>
                    </form>
                </div>
            </div>
            <img src="/src/assets/Group 7735.png" className="mt-10" alt="" />
        </div>
    )
}