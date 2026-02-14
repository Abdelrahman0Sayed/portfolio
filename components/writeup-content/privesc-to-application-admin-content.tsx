import { Share2 } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock, InlineCode } from '@/components/code-block'
import { SplitViewWrapper } from '@/components/split-view-wrapper'

interface WriteupContentProps {
  writeup: any
}

export function PrivescToApplicationAdminContent({ writeup }: WriteupContentProps) {
  const [copied, setCopied] = useState(false)

  return (
    <SplitViewWrapper>
      <article className="w-full max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <p className="text-sm font-mono text-zinc-400">02/02/2026</p>
      </div>

      <h1 className="text-4xl md:text-5xl font-light text-center mb-6 font-mono leading-tight">
        {writeup.title}
      </h1>

      <div className="text-center mb-8 space-y-4">
        <p className="text-sm text-zinc-400 font-mono">Bug Hunting</p>
        
        <div className="flex items-center justify-center gap-2">
          <Share2 size={16} className={copied ? "text-green-500" : "text-red-500"} />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className={`text-sm font-mono transition-colors ${
              copied ? "text-green-500" : "text-red-500 hover:text-red-400"
            }`}
          >
            {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </div>

      <div className="text-center mb-16">
        <p className="text-3xl text-white-500 font-bold tracking-widest">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
      </div>

      <div className="mb-16">
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900">
          <img
            src='/writeup-cover/privsec-to-application-admin.png'
            alt={writeup.title}
            className="w-full h-96 object-cover"
          />
        </div>
      </div>
        
    {/* Introduction */}
    <p className="mb-8">
        Hi Hackers, today we are gonna talk about a basic broken access control vulnerability i have found on a production-based closed project used for calculating the risk measure happens in incidents at medical industries
    </p>
    
    {/* Main Content */}
    <div className="space-y-8 text-lg leading-relaxed text-zinc-300">
        
        
        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Overview"}
        </p>
        <p>
            the overall idea about it is to create a project to identify the problems faced you in the healthcare facility and the root cause of these problems, then each member in the project will evaluate these problems and rate the impact and its probability of occurrence, it also provide a shared notes between the members
        </p>

        <p>
            Then the application will collect these evaluation and return the final Risk Management results with some mitigations in a detailed report.
        </p> 


        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Roles"}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Application Admin / Super admin:</strong> who manage the users and the whole web application
          </li>
          <li>
            <strong>Project Manager:</strong> The one who create the project and manage the coordinated users and give them permissions
          </li>
          <li>
            <strong>Coordinator:</strong> The one who can evaluate and rate the problems
          </li>
           <li>
            <strong>Member:</strong> The one who can just access the project data without any write permissions.
          </li>
        </ul>   

         <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"PoC"}
        </p>
        <p>
            The idea of the bug that the application admin can create any user, and the project manager should create coordinator and member users only.
        </p>
        <p>
            The validation done the server taking the JWT token of the request’s sender, decrypt and extract his role
        </p>

        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src="/writeup-images/PrivEsc_to_app_admin/create_request.png"
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>
        
        <p>Firstly, I've tried to use this endpoint with lower privilege user like coordinator, and it gave me a <InlineCode>403  Forbidden</InlineCode> (Super admin and Project manager only can create users!).</p>
        
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src="/writeup-images/PrivEsc_to_app_admin/forbidden.png"
            alt="Roles in the application"
            className="w-full h-auto object-cover"
          />
        </div>
        
        <p>But I've noticed that all of them use the same endpoint!, so it may be a general validation of these two roles </p>
        
        <p>So Secondly, I tried to create a user with project manager privileges but change the new user permissions from coordinator/member to application admin/super admin privilege and it worked!!</p>
        
        <p>So as an image about backend code, the server user only validate on the role of the sender but doesn’t validate if the user can create this account or not.</p>
        
        {/* Code Block */}
        <CodeBlock
          language="python"
          code={`@app.post("/create")
async def create_user(
    authorization: str = Header(None), 
    payload: Dict[str, Any] = Body(...)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")

    try:
        token = authorization.replace("Bearer ", "")
        
        decoded_token = jwt.decode(token, ENV_SECRET, algorithms=[ALGORITHM])
        role = decoded_token.get("role")
        
        if role in ["super_admin", "project_admin"]:
            new_user = {
                "email": payload.get("email"),
                "role": payload.get("role"),
                ......
            }
            
            return {"success": True, "message": "User created successfully"}
        
        raise HTTPException(status_code=403, detail="Forbidden: Only super or project admins can create users")

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")`}
        />


        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src="/writeup-images/PrivEsc_to_app_admin/create_admin.png"
            alt="Mass Assignment"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src="/writeup-images/PrivEsc_to_app_admin/admin_dashboard.png"
            alt="Admin Role"
            className="w-full h-auto object-cover"
          />
        </div>
        <p>That's it for this writeup, hope you enjoyed it and learned something new. See you in the next one!</p>
    </div>
    
    </article>
    </SplitViewWrapper>
  )
}
