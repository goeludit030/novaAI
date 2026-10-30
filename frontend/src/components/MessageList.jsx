import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import MessageBubble from './MessageBubble'
import LoadingAnimation from './LoadingAnimation'
import { Sparkles, Code2, Database, LayoutDashboard } from 'lucide-react'

function MessageList() {
    const {selectedConversation}=useSelector(state=>state.conversation)
    const {messages,isLoading}=useSelector(state=>state.message)
    const bottemRef=useRef(null)
   
   useEffect(()=>{
       requestAnimationFrame(()=>{
        bottemRef?.current?.scrollIntoView({
          behavior:"smooth",
          block:"end"
        })
       })
   },[messages?.length,isLoading])


  return (
    <div className='flex-1 overflow-y-auto px-6 py-6 space-y-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
      
      {messages.length==0 || !selectedConversation ?(
        <div className="h-full flex flex-col items-center justify-center gap-7 text-center animate-fade-up">
           {/* glowing brand orb */}
           <div className='relative animate-floaty'>
               <div className='absolute inset-0 brand-gradient rounded-3xl blur-2xl opacity-60 animate-pulse-glow'/>
               <div className='relative flex items-center justify-center w-20 h-20 rounded-3xl brand-gradient glow-indigo'>
                   <Sparkles size={34} className='text-white'/>
               </div>
           </div>

           <div className='flex flex-col gap-2'>
               <h1 className='text-[30px] font-bold tracking-tight'>How can I help you <span className='brand-text'>today</span>?</h1>
               <p className='text-[14px] text-slate-400 max-w-[380px] leading-relaxed'>Ask anything — write & preview code, search the web, analyze PDFs and images, or generate a presentation.</p>
           </div>

           <div className='flex flex-wrap justify-center gap-2.5 mt-1 max-w-[460px]'>
            {[
              {icon:Code2, label:"Write a Netflix clone"},
              {icon:Database, label:"Explain Redis"},
              {icon:LayoutDashboard, label:"Build a dashboard"},
            ].map(({icon:Icon, label})=>(
              <button key={label} className='group flex items-center gap-2 text-[12.5px] font-medium text-slate-300 glass border border-white/[0.08] px-4 py-2.5 rounded-xl hover:border-indigo-500/40 hover:text-white transition-all duration-200 cursor-pointer'>
                <Icon size={14} className='text-indigo-400 group-hover:scale-110 transition-transform duration-200'/>
                {label}
              </button>
            ))}
           </div>
        </div>
      ):
      <div className='space-y-5'>

        {messages?.map((msg,i)=>(
            <div>
               <MessageBubble role={msg?.role} content={msg?.content} images={msg.images || []} /> 
            </div>
        ))}

        {isLoading && <LoadingAnimation/>}

        
      </div>
      }
      <div ref={bottemRef}/>
    </div>
  )
}

export default MessageList
