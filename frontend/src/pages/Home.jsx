import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../../utils/firebase'
import api from '../../utils/axios'
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { setUserdata } from '../redux/userSlice';
import SideBar from '../components/SideBar';
import ChatArea from '../components/ChatArea';
import Artifact from '../components/Artifact';
import { Sparkles } from 'lucide-react';

function Home() {
    const {userData}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token })
            dispatch(setUserdata(data))
        } catch (error) {
            console.log(error)
        }
    }


    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider)
        const token = await data.user.getIdToken()
        console.log(token)
        await handleLogin(token)
        console.log(data)
    }
    return (
        <div className='app-bg h-screen flex text-white overflow-hidden'>

<SideBar/>
<ChatArea/>
<Artifact/>


{!userData &&   <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4'>
                {/* ambient glows behind the card */}
                <div className='glow-blob animate-aurora w-[22rem] h-[22rem] brand-gradient' style={{top:'20%',left:'38%'}}/>
                <div className='glow-blob animate-aurora w-[18rem] h-[18rem]' style={{bottom:'22%',right:'36%',background:'#d946ef',animationDelay:'-6s'}}/>

                <div className='relative w-[360px] glass border border-white/[0.09] rounded-3xl p-8 flex flex-col gap-6 shadow-2xl animate-fade-up'>
                    <div className='flex flex-col items-center gap-4 text-center'>
                        <div className='relative'>
                            <div className='absolute inset-0 brand-gradient rounded-2xl blur-lg opacity-60 animate-pulse-glow'/>
                            <div className='relative flex items-center justify-center w-14 h-14 rounded-2xl brand-gradient glow-indigo'>
                                <Sparkles size={26} className='text-white'/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <h2 className='text-2xl font-bold tracking-tight'>Welcome to <span className='brand-text'>NovaAI</span></h2>
                            <p className='text-[13px] text-slate-400 leading-relaxed'>Your multi-modal AI workspace — chat, code, search,<br/>analyze PDFs & images, and build presentations.</p>
                        </div>
                    </div>

                    <button className='w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-all duration-150 cursor-pointer active:scale-[0.98]' onClick={googleLogin}>
                        <FcGoogle size={18} />
                        Continue with Google
                    </button>

                    <p className='text-center text-[11px] text-slate-600'>By continuing you agree to our Terms & Privacy Policy.</p>
                </div>
            </div>}

        </div>
    )
}

export default Home
