'use client'

import { Share2, Underline } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock, InlineCode } from '@/components/code-block'
import { SplitViewWrapper } from '@/components/split-view-wrapper'
import { assetPath } from '@/lib/asset-path'

interface WriteupContentProps {
  writeup: any
}

export function AndroidHackingContent({ writeup }: WriteupContentProps) {
  const [copied, setCopied] = useState(false)

  return (
    <SplitViewWrapper>
      <article className="w-full max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <p className="text-sm font-mono text-zinc-400">{writeup.date}</p>
      </div>

      <h1 className="text-4xl md:text-5xl font-light text-center mb-6 font-mono leading-tight">
        {writeup.title}
      </h1>

      <div className="text-center mb-8 space-y-4">
        <p className="text-sm text-zinc-400 font-mono">{writeup.subtitle}</p>
        
        <div className="flex items-center justify-center gap-2">
          <Share2 size={16} className={copied ? "text-green-500" : "text-red-500"} />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="text-sm font-mono cursor-pointer hover:text-red-400 transition-colors"
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

      <div className="space-y-8 text-lg leading-relaxed text-zinc-300">
        <p>
         This blog will be an introduction for you if you want to start in Android Penetration Testing
        </p>

        <p>The Outline of this blog will be:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Android Internals Fundamentals</strong></li>
          <li><strong>Android Application Major Components</strong></li>
          <li><strong>Known Vulnerabilities with Practical Lab</strong></li>
        </ul>

        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Android Internals Fundamentals"}
        </p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/android_internals.png')}
              alt={writeup.title}
              width={900}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">1. Application Layer</h1>
        <ul className="list-disc list-inside space-y-2">
          <li>This is the <strong>top layer</strong>, where all user-installed apps reside.</li>
          <li>Examples: Instagram, WhatsApp, Gmail, custom apps.</li>
        </ul>
        <p><strong>Responsibilities:</strong></p>
        <ul className="list-disc list-inside space-y-2">
          <li>Interact with the user via UI (Activities).</li>
          <li>Perform tasks (Services) and handle data (Content Providers).</li>
        </ul>

        <p><strong>Sandboxing:</strong></p>
        <ul className="list-disc list-inside space-y-2">
          <li>Each app runs as a separate Linux user with its own UID.</li>
          <li>Private storage:</li>
         <CodeBlock 
          code="/data/data/{package-name}"
          language="path"
        />
        <li>Only this app can access its data, and if there’s any other application wants to communicate with it, it will need the Binder.</li>
        </ul>
        
        <p><strong>Key point:</strong> Apps cannot directly access other apps’ memory or data.</p>




        <h1 className="text-2xl font-bold text-white mb-4">2. Android APIs / Application Framework Layer</h1>
        <ul className="list-disc list-inside space-y-2">
          <li>Provides a <strong>set of reusable services and APIs</strong> for apps.</li>
          <p><strong>Examples of services:</strong></p>
          <li>Activity Manager (manage app lifecycle)</li>
          <li>Content Providers (access shared data)</li>
          <li>Location Manager, Notification Manager, Telephony Manager</li>
          <li>Apps <strong>call APIs</strong> to perform system-level tasks without dealing with low-level code.</li>
        </ul>

        <p><strong>Execution flow:</strong></p>
         <CodeBlock 
          code="Application → Android API → Binder → Kernel"
          language="flow"
        />        

        <p><strong>Key point:</strong> APIs act as a bridge between app code and system-level operations.</p>

        <h1 className="text-2xl font-bold text-white mb-4">3. Binder Layer (Interprocess Communication — IPC)</h1>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Binder</strong> is Android’s core <strong>interprocess communication (IPC)</strong> mechanism.</li>
          <p><strong>Purpose: </strong></p>
          <li>Allow apps and system services to communicate securely and efficiently.</li>
          <li>Example: Instagram requesting contacts from a system service.</li>
          <p><strong>Characteristics: </strong></p>
          <li>Each process memory is private.</li>
          <li>Provides <strong>controlled access</strong> controlled access.</li>
        </ul>
        <p><strong>Flow:</strong></p>
        <CodeBlock 
          code="Application calls API → Binder sends request → Target service responds"
          language="flow"
        />        
        <p><strong>Key point:</strong> Binder ensures apps cannot directly manipulate other apps’ memory but can still request services safely.</p>



        <h1 className="text-2xl font-bold text-white mb-4">4. Linux Kernel Layer</h1>
        <ul className="list-disc list-inside space-y-2">
          <li>The <strong>bottom layer</strong> acts as an interface between software and hardware.</li>
          <p><strong>Responsibilities: </strong></p>
          <li>Process and memory management</li>
          <li>Hardware drivers (Wi-Fi, Camera, Audio)</li>
          <li>Security enforcement (SELinux, permissions)</li>
          <li>Binder driver implementation (enables IPC)</li>
          <li>All <strong>system calls</strong> and low-level operations eventually go through the kernel.</li>
          <p><strong>Characteristics: </strong></p>
          <li>Each process memory is private.</li>
          <li>Provides <strong>controlled access</strong> controlled access.</li>
        </ul>
    
        <p><strong>Key point:</strong> The Kernel is the foundation that enforces security, manages resources, and runs low-level operations.</p>
                <p><strong>Flow:</strong></p>
         <CodeBlock 
          code={`+-------------------+
|   Applications    |  → UI, App logic, Activities, Services
+-------------------+
          |
          v
+-------------------+
|  Android APIs     |  → Activity Manager, Content Provider, Location, etc.
+-------------------+
          |
          v
+-------------------+
|      Binder       |  → Interprocess Communication (IPC)
+-------------------+
          |
          v
+-------------------+
|   Linux Kernel    |  → Hardware access, process & memory management, security
+-------------------+`}
          language="diagram"
        />    
        









        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Application Major Components"}
        </p>
        <p>In Android development, components are the essential building blocks of an Android app. Each component serves a specific purpose in how your app functions and interacts with the system or users.</p>
        <h2 className="text-2xl font-bold text-white mb-4">The 4 main components of Android are</h2>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/android_app_components.png')}
              alt="Comparison function"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4">1. Activities (UI)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>What it is:</strong> Represents a single screen with a user interface.</li>
          <li><strong>Example:</strong> A login screen, home screen, or settings page.</li>
          <li><strong>Key class:</strong> android.app.Activity</li>
          <li><strong>Lifecycle methods:</strong> onCreate(), onStart(), onResume(), onPause(), onStop(), onDestroy()</li>
          <li><strong>onCreate()</strong> ➜ When the activity is created</li>
          <li><strong>onStart()</strong> ➜ When the activity becomes visible to the user</li>
          <li><strong>onResume()</strong> ➜ When the activity is ready for user interaction</li>
          <li><strong>onPause()</strong> ➜ When the activity is partially hidden or temporarily interrupted</li>
          <li><strong>onStop()</strong> ➜ When the activity is no longer visible</li>
          <li><strong>onDestroy()</strong> ➜ When the activity is about to be destroyed (removed from memory)</li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-4">2- Services (Background task)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>What it is:</strong> Runs in the background to perform long-running operations without a user interface.</li>
          <li><strong>Example:</strong> Playing music, downloading files.</li>
          <li><strong>Key class:</strong> android.app.Service</li>
          <p><strong>Types:</strong></p>
          <li><strong>Started Service</strong> ➜ Started Service</li>
          <li><strong>Bound Service</strong> ➜ (interacts with other components)</li>
          
        </ul>

        <h3 className="text-xl font-bold text-white mb-4">3- Broadcast Receivers (Listen/respond to broadcast messages)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>What it is:</strong> Responds to system-wide broadcast messages or app-generated broadcasts.</li>
          <li><strong>Example:</strong> Battery low warning, SMS received, Wi-Fi connected.</li>
          <li><strong>Key class:</strong> android.content.BroadcastReceiver</li>
          <p><strong>Registered via:</strong></p>
          <li><strong>Manifest </strong> ➜ (for system events)</li>
          <li><strong>Code (Context.registerReceiver)</strong> ➜ (for dynamic registration)</li>
        </ul>

        
        <h3 className="text-xl font-bold text-white mb-4">4- Content Providers(Share/access data between apps)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>What it is:</strong> Manages access to a structured set of data.</li>
          <li><strong>Example:</strong> Contacts, images, or data shared between apps.</li>
          <li><strong>Key class:</strong> android.content.ContentProvider</li>
          <li><strong>Used with: ContentResolver </strong>to query/update data.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-4">5- Fragments (Reusable part of UI within activity)</h3>
        <p>(not a core component but widely used)</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>What it is:</strong> A reusable portion of the UI inside an Activity..</li>
          <li><strong>Example:</strong> A fragment showing a list, while another shows details.</li>
          <li><strong>Key class:</strong> <strong>android.app.Fragment</strong> (or androidx.fragment.app.Fragment in modern apps)</li>
          <li><strong>Used with: ContentResolver </strong>to query/update data.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mb-4">6- Intents (Messaging object for communication)</h3>
        <p>(not a component, but essential for communication)</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>What it is:</strong> A messaging object to request an action from another app component.</li>
          <p><strong>Types:</strong></p>
          <li><strong>Explicit Intent:</strong> Launches a specific component</li>
          <li><strong>Implicit Intent:</strong> Declares a general action (e.g., “view this URL”)</li>
        </ul>





        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Vulnerabilities With Practical Lab"}
        </p>
        <p>Tools we will need</p>
        <CodeBlock 
          code={`kali linux --> As attacker machine
LDPlayer --> Android Simulator
Jadx --> Decompiler to reverse engineer the APK
ApkTool --> Another Decompiler we can use on kali linux
Ghidra/IDA --> Disassembler to read the full soruce code and .so files
Frida Server --> frida server+client
AllSafe APK --> Application contains all vulnerabilities we want to exploit`}
          language="text"
        />       

        <h3 className="text-2xl font-bold text-white mb-4">Repeated steps</h3>
        <p>In all the following screenshots. It contains the source code of each activity (Page) we test — By dragging and dropping the APK on jadx to reverse engineer the application —</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/jadx_gui.png')}
              alt="Comparison function"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        <p>Before starting to discover, we need to get root access on the Android device, so make sure that you have enabled the USB debugging on the device via the system options</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/usb_debugging.png')}
              alt="Comparison function"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <p>Then, to get the root shell (Kali Linux)</p>

        <CodeBlock 
          code={`root@kali:~# adb connect <Emulator-IP>
root@kali:~# adb root
root@kali:~# adb shell`}
          language="bash"
          showLineNumbers={true}
        />      
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/adb_connection.png')}
              alt="ADB Connection"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <p>Ok, now we can see the source code of the application on jadx and a root shell on the Android device on Kali. Let’s dive into the vulnerabilities</p>
        
        <h3 className="text-2xl font-bold text-white mb-4">1. Insecure Logging</h3>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/insecure_logging.png')}
              alt="Insecure Logging"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <p>Which means that there are sensitive credentials saved in the application logs, so we need to add the credentials and try to monitor the logs of the app</p>
        <p>So, if we go to the source code of this activity, we will note that any credentials entered by the user will be saved</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/insecure_logging_code.png')}
              alt="Insecure Logging Code"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <p>To exploit it, let's monitor the application’s logs and enter any credentials</p>
        <CodeBlock 
          code={`adb logcat --pid=$(adb shell pidof -s <Package-Name>)`}
          language="bash"
        />      
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/display_logs.png')}
              alt="Display Logs"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>



        <h3 className="text-2xl font-bold text-white mb-4">2- Hardcoded Credentials</h3>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/hardcoded_creds.png')}
              alt="Insecure Logging Code"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <p>which means there a plain text credentials that exist in the activity’s source code or may be in the .so library</p>
        <p>One of the most common places that may contain hardcoded creds, like:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Source Code of the activity</li>
          <li>strings.xml file (Resources -{'>'} resources.arsc -{'>'} res -{'>'} values -{'>'} strings.xml)</li>
          <li>attached .so files</li>
        </ul>
        <p>So let’s search in these places</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/hardcoded_username.png')}
              alt="Hardcoded Username"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/hardcoded_password.png')}
              alt="Hardcoded Password"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <p>and also found another credential in the strings.xml file</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/strings_xml.png')}
              alt="Hardcoded Password"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      
      <h3 className="text-2xl font-bold text-white mb-4">3- Firebase Database</h3>
      <p>In this Challenge, the application is connected to a Firebase database somewhere, and to solve the lab, we need to get the secret of the challenge. Let’s read the source code</p>
      <p>Firebase is like an Online database that the applications can use to store and get data</p>

      <p className='italic'><strong>Hint:</strong> the communication with Firebase is done through a .json endpoint, which means if we want to get data or communicate with the database, we will use extension .json to communicate</p>

      
      <p>So we need to search for the Firebase URL in the source code and communicate with it, and I found it in the strings.xml file</p>
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/firebase_database.png')}
              alt="Hardcoded Password"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>
      <p>So we will try to get the secret from <strong>https://allsafe-8cef0.firebaseio.com/secret.json</strong></p>
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/secrets_json.png')}
              alt="Hardcoded Password"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>
      <p>Or we can try to get all data by just .json endpoint (<strong>https://allsafe-8cef0.firebaseio.com/.json</strong>)</p>
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/firebase_flag.png')}
              alt="Hardcoded Password"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4">4- Insecure Shared Preferences</h3>
      <p>This means that the application stores the credentials in the shared preferences as plain text without any encryption</p>
      <p><strong>(Shared Preferences located in /data/data/&lt;package-name&gt;/shared_prefs)</strong></p>
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/shared_pref_code.png')}
              alt="Insecure Shared Preferences"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>

      <p>We will notice that the password and username are stored as it is without any encryption, so if the user enters their credentials, we can access these credentials if the attacker gets a root shell in the Android device of the victim</p>
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/shared_pref_poc.png')}
              alt="Insecure Shared Preferences"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>
      



      <h3 className="text-2xl font-bold text-white mb-4">5- SQL Injection</h3>
      <p>This means there’s no filtration for untrusted input from the user, which leads to treating the input as a SQL Query instead of a string. The attacker can exploit this vulnerability to dump data from the database. It may sometimes lead to RCE.</p>
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/sqli_code.png')}
              alt="SQL Injection"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>
      <p>We will notice that the username field was taken from the user without any validation, so we can enter a SQL query instead of normal input</p>

      <p>We can enter a normal payload like:</p>
      <CodeBlock 
        code={`admin’ OR 1=1-- - // Put this in the username field and enter any password`}
        language="bash"
      /> 
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/sqli_poc.png')}
              alt="SQL Injection"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>
      <p>Now, we could get the username and the MD5 Password Hash of each user, including the admin account.</p>




      <h3 className="text-2xl font-bold text-white mb-4">6. PIN Bypass</h3>
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src={assetPath('/writeup-images/android-hacking-intro/pin_bypass_hardcode.png')}
              alt="PIN Bypass"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>

      <p>To solve this challenge, we need to enter the correct PIN Code to guarantee access</p>
      <p>This challenge can be solved in three ways:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>Read the source code (maybe the PIN exists hardcoded in the source code)</li>
        <li>Brute force on the activity until you get the right PIN</li>
        <li>Hook a Frida script that manipulates the application to accept any PIN value instead</li>
      </ul>
      
      <p><strong>Method 01:</strong></p>
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src="/writeup-images/android-hacking-intro/pin_bypass_hardcode.png"
              alt="PIN Bypass"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>
      <p>We will notice that the source code compares the PIN taken from the user with a base64 decoded value of this string <strong>“NDg2Mw==”</strong> and in the last line, the function compare between the PIN and this value, So it'seems that this is the correct PIN but encoded in base64, So let’s decode it to get the correct pin value</p>   
      <div className="mb-16">
        <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
            <img
              src="/writeup-images/android-hacking-intro/pin_bypass_hardcode.png"
              alt="PIN Bypass"
              className="w-full h-auto object-cover"
            />
        </div>
      </div>
      <p><strong>Method 02:</strong> Brute forcing the PIN using a Frida script</p>
      <CodeBlock 
        code={`Java.perform(function() {
  var PinBypass = Java.use("infosecadventures.allsafe.challenges.PinBypass");

  // Hook the checkPin method
  PinBypass.checkPin.implementation = function(pin) {
      // Call original method
      var result = this.checkPin(pin);

      // Print attempts
      console.log("[*] Tried PIN: " + pin + " => " + result);

      if (result) {
          console.log("[+] Correct PIN found: " + pin);
      }

      return result;
  };

  // Brute force from Frida side
  Java.scheduleOnMainThread(function() {
      console.log("[*] Starting brute force...");

      var ActivityThread = Java.use("android.app.ActivityThread");
      var app = ActivityThread.currentApplication();
      var ctx = app.getApplicationContext();

      var PinBypassClass = Java.use("infosecadventures.allsafe.challenges.PinBypass");
      var pinBypass = PinBypassClass.$new();

      for (var i = 0; i <= 9999; i++) {
          var attempt = ("0000" + i).slice(-4); // format as 4-digit PIN
          var res = pinBypass.checkPin(attempt);
          console.log("[*] Attempt: " + attempt + " => " + res);
          if (res) {
              console.log("[+] FOUND PIN: " + attempt);
              break;
          }
      }
  });
});`}
          language="java"
          showLineNumbers={true}
        />   


        <p>Note: Make sure that the Frida server is running on the Android device</p>
        <p>Now, let’s hook this script and try to add any PIN value.</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/frida_pin_bruteforce.png')}
                alt="PIN Bypass"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>
        <p>We will notice that once we inject the script, the application resets, and the brute forcing starts immediately</p>

        <p><strong>Method 03:</strong> Edit the logic to make all PIN values be correct by using a Frida script that manipulates the implementation to always return true</p>
        <CodeBlock 
        code={`Java.perform(function() {
  var PinBypass = Java.use("infosecadventures.allsafe.challenges.PinBypass");

  PinBypass.checkPin.implementation = function(pin) {
      return true; // Make the check function always returns true
  };
});`}
          language="java"
          showLineNumbers={true}
        />   
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/frida_pin_bypass.png')}
                alt="PIN Bypass"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>
        <strong>So if we enter any PIN value, it will give us access granted</strong>
        


        <h3>7- Root Bypass Detection:</h3>
        <p>Some applications refuse to work on rooted devices as a way to prevent attacks or accessing sensitive credentials of the application, so the application uses some checks to know if the device is rooted or not, like: some attributes, searching for some binaries, trying to create files in a root directory, etc.</p>

        <p>Now, to bypass the root detection, we need to hook the check of the application and manipulate it so the application can’t see that the device is rooted, like the zygisk application hides all the binaries that indicate the root of the device, so it bypasses the root detection</p>

        <p>I will Frida Code from Frida Code share and hook it to the application (Note: Frida Server should be running on the device as a debugger)</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/frida_server.png')}
                alt="PIN Bypass"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>
        
        <p>We can search on Frida code share for any script that can be used for Bypassing root detection</p>
        <p>Frida Script → https://codeshare.frida.re/@Q0120S/root-detection-bypass/</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/root_detection.png')}
                alt="PIN Bypass"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>





        <h3 className="text-2xl font-bold text-white mb-4">8- Vulnerable WebView</h3>
        <p>The <strong>WebView</strong> is very similar to the <strong>iframe</strong> in the web application; it’s like a frame that presents the content of a specific URL, so if there’s no security control on the URL that the user enters, the attacker can try to access internal data through this URL</p>

        <p>Some rappers can be used to access local data through URLs like file rapper</p>
        <p>First, I tried to add a normal URL to check if the activity is working</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/webview_google.png')}
                alt="PIN Bypass"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>

        <p>So, let's try to access local data on the device, like the Shared Preferences (which was explained previously) of this package</p>
        <p><strong>file:///data/data/{'<'}package-name{'>'}/shared_prefs/user.xml</strong> ( I already know the correct path because I have root permissions on the device )</p>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/LFI.png')}
                alt="PIN Bypass"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>

        <p>And we could access the shared preferences of the package, which is also stored insecurely, which leads to a very critical scenario.</p>
        
        <h3 className="text-2xl font-bold text-white mb-4">9- Weak Cryptography</h3>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/weak_cryptography.png')}
                alt="Weak Cryptography"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>
        <p>Its vulnerability exists in the web application when the application stores its credentials in an insecure way or in weak encryption, so anyone can decrypt the credentials and steal the users’ data</p>

        <p>We can solve it in two methods</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Reverse-engineer and read the source code.</strong></li>
          <li><strong>Frida script that hooks the application and tries to get the encryption algorithms and secret keys.</strong></li>
        </ul>

        <p><strong>Frida script for Crypto Operations interception → </strong><a href="https://codeshare.frida.re/@fadeevab/intercept-android-apk-crypto-operations/" target="_blank" rel="noopener noreferrer">https://codeshare.frida.re/@fadeevab/intercept-android-apk-crypto-operations/</a></p>
      
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/weak_crypto_frida.png')}
                alt="Weak Cryptography"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>
        <p>Ok, now we have the secret key and the encryption algorithm, we can use them to encrypt/decrypt any data stored in the application.</p>
        <CodeBlock 
        code={`#!/usr/bin/env python3
import base64
from Crypto.Cipher import AES

KEY = b"1nf053c4dv3n7ur3"  # Must be 16 bytes for AES-128

# --- PKCS5/7 Padding helpers ---
def pkcs7_pad(data: bytes) -> bytes:
    pad_len = AES.block_size - (len(data) % AES.block_size)
    return data + bytes([pad_len]) * pad_len

def pkcs7_unpad(data: bytes) -> bytes:
    pad_len = data[-1]
    if pad_len < 1 or pad_len > AES.block_size:
        raise ValueError("Invalid padding")
    return data[:-pad_len]

# --- Encrypt function ---
def encrypt(plaintext: str) -> str:
    cipher = AES.new(KEY, AES.MODE_ECB)
    padded = pkcs7_pad(plaintext.encode("utf-8"))
    encrypted = cipher.encrypt(padded)
    return base64.b64encode(encrypted).decode("utf-8")  # Safe string

# --- Decrypt function ---
def decrypt(ciphertext_b64: str) -> str:
    cipher = AES.new(KEY, AES.MODE_ECB)
    ciphertext = base64.b64decode(ciphertext_b64)
    decrypted_padded = cipher.decrypt(ciphertext)
    return pkcs7_unpad(decrypted_padded).decode("utf-8", errors="ignore")

# --- Main menu ---
if __name__ == "__main__":
    print("Choose an option:")
    print("1) Encrypt")
    print("2) Decrypt")
    choice = input("Enter choice (1/2): ").strip()

    if choice == "1":
        plaintext = input("Enter text to encrypt: ")
        encrypted_text = encrypt(plaintext)
        print(f"Encrypted (Base64): {encrypted_text}")

    elif choice == "2":
        ciphertext = input("Enter Base64 ciphertext: ")
        try:
            decrypted_text = decrypt(ciphertext)
            print(f"Decrypted text: {decrypted_text}")
        except Exception as e:
            print("Error decrypting:", e)

    else:
        print("Invalid choice")`}
          language="python"
          showLineNumbers={true}
        />   
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/weak_crypto_python.png')}
                alt="Weak Cryptography"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>
        <p>And now, we can decrypt any secret data stored in the application, as we see in the previous screenshot.</p>




        <h3 className="text-2xl font-bold text-white mb-4">10- Certificate Pinning Bypass</h3>
        <p>Sometimes the Application trusts its own certificates, so no one can make the application send a request to another API or website, or even intercept the request that is sent between the Android application and their APIs (like Burp Suite), so this prevents the attacker or the pentester from intercepting and testing the requests that are sent between the app and the API Endpoints</p>

        <p>So we need to bypass this issue and make the application trust our certificate (Burp certificate) to be able to intercept the requests and test it</p>

        <p>But before doing it, make sure that you add your proxy settings to your WIFI settings on the Android device and add the Burp certificate also in your settings <strong>(you can check any YouTube video to help you in this step)</strong></p>

        
        <p>There are multiple ways we can use to make the application trust our certificate</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Medusa Automated tool</li>
          <li>Frida script that pins our certificate</li>
        </ul>

        <p><strong>Medusa:</strong></p>
        <p>Medusa is a tool that contains a lot of modules we can use to test vulnerable Android apps, like root detection bypass, certificate pinning, and more.</p>
        <p>The Medusa tool will make our application trust the proxy that it will set up for us, so all we need to do is use the modules provided by this tool, then set up the proxy that it made for us to be able to intercept the request sent from this application</p>
          
        <CodeBlock 
        code={`(192.168.1.3:5555) medusa➤ show all  # show all modules in the tool`}
          language="shell"
          showLineNumbers={true}
        />   
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/medusa_modules.png')}
                alt="Weak Cryptography"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>

        <p>And this is the module we will use to bypass SSL Pinning <strong>http_communications/universal_SSL_pinning_bypass</strong></p>
        <CodeBlock 
        code={`(192.168.1.3:5555) medusa➤ use http_communications/universal_SSL_pinning_bypass`}
          language="shell"
          showLineNumbers={true}
        />   <CodeBlock 
        code={`(192.168.1.3:5555) medusa➤ run -f <package-name>`}
          language="shell"
          showLineNumbers={true}
        />   
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/medusa_output.png')}
                alt="Weak Cryptography"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>
        <div className="mb-16">
          <div className="border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 mx-auto">
              <img
                src={assetPath('/writeup-images/android-hacking-intro/burp_detection.png')}
                alt="Weak Cryptography"
                className="w-full h-auto object-cover"
              />
          </div>
        </div>
        <p>And as you can see, we became able to intercept the requests of the application</p>
      

        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Resources"}
        </p>
        <p><strong>Black-Belt Edition Course:</strong> <a href="https://www.udemy.com/course/android-app-hacking-black-belt-edition" target="_blank" rel="noopener noreferrer">https://www.udemy.com/course/android-app-hacking-black-belt-edition</a></p>
        <p><strong>MaharaTech Course:</strong> <a href="https://maharatech.gov.eg/course/view.php?id=2255" target="_blank" rel="noopener noreferrer">https://maharatech.gov.eg/course/view.php?id=2255</a></p>
        <p><strong>Write-up about “OWASP Mobile Top 10”:</strong> <a href="https://infosecwriteups.com/owasp-mobile-top-10-52987725a12c" target="_blank" rel="noopener noreferrer">https://infosecwriteups.com/owasp-mobile-top-10-52987725a12c</a></p>

        <h2 className="text-2xl font-bold text-white mb-4"><strong>Stay tuned for more!</strong></h2>
      
      </div>
    </article>
    </SplitViewWrapper>
  )
}
