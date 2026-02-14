'use client'

import { Share2 } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock, InlineCode } from '@/components/code-block'
import { SplitViewWrapper } from '@/components/split-view-wrapper'
import { assetPath } from '@/lib/asset-path'

interface WriteupContentProps {
  writeup: any
}

export function Zinad26RevContent({ writeup }: WriteupContentProps) {
  const [copied, setCopied] = useState(false)

  return (
    <SplitViewWrapper>
      <article className="w-full max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <p className="text-sm font-mono text-zinc-400">08/02/2026</p>
      </div>

      <h1 className="text-4xl md:text-5xl font-light text-center mb-6 font-mono leading-tight">
        ZinadIT Cyber Champions CTF 2026 | Reverse Engineering
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

      {/* Main Content */}
    <div className="space-y-8 text-lg leading-relaxed text-zinc-300">
        
        
        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Easy Level"}
        </p>

        <h1 className="text-2xl font-bold text-white mb-4">Challenge 01: Calc</h1>
        <p>
            The main idea of this binary is to take a string input from the user and respond with Wrong or correct flag!
        </p>

        <p>
            Lets try to reverse the binary and see how it works, I will start with Ghidra as static analysis
        </p> 

        <p>Browse to the entry point of the application to get the main function of the application</p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/calc_entry_point.png')}
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>
        <p>As we see the <InlineCode>FUN_00101159</InlineCode> is the main function, double click to see it.</p>
        
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/calc_main_function.png')}
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>
        
        <p>As we see here's the main logic of the binary, if you struggle with reading the function, you can use AI to make it more human readable like this:</p>
        <CodeBlock 
          code={`uint64_t check_flag(uint64_t unused_arg, long user_input_struct)
{
    char *flag_buffer;
    int cmp_result;

    int i;
    int j;
    int k;

    flag_buffer = *(char **)(user_input_struct + 8);

    for (i = 0; i < 6; i++) {
        flag_buffer[i] += 5;
    }

    for (j = 6; j < 11; j++) {
        flag_buffer[j] -= 5;
    }

    for (k = 11; k < 29; k++) {
        flag_buffer[k] ^= 0x10;
    }

    cmp_result = strcmp(flag_buffer, "_nHmruvO++Z]ESXOSP\\\\SE\\\\PDY ^Jm");

    if (cmp_result == 0) {
        printf("Correct Flag");
    } else {
        puts("Wrong Flag!!");
    }

    return 0;
}
`}
          language="c"
          fileName="check_flag.c"
          showLineNumbers={true}
        />

        <p>The binary take the input from the user, apply three transformations to the input string</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Add 5 to the first 6 characters</strong>
          </li>
          <li>
            <strong>Subtract 5 from characters 6 to 11</strong>
          </li>
          <li>
            <strong>XOR characters 11 to 29 with 0x10</strong>
          </li>
        </ul>  
        <p>And then compare it with an expected value to determine if the flag is correct or not. which means that this string is the corrected flag</p>

        <p>To get the flag, take this string and reverse the transformation applied in this binary by this code and thats it</p>


        <CodeBlock 
          code={`#!/usr/bin/env python3

target = input("Enter the target string: ")


flag = []

print("\\nReversing positions 0-5 (subtract 5):")
for i in range(6):
    original_char = chr(ord(target[i]) - 5)
    flag.append(original_char)

print("Reversing positions 6-10 (add 5):")
for i in range(6, 11):
    original_char = chr(ord(target[i]) + 5)
    flag.append(original_char)

print("Reversing positions 11-28 (XOR with 0x10):")
for i in range(11, len(target)):
    original_char = chr(ord(target[i]) ^ 0x10)
    flag.append(original_char)
    

flag_string = ''.join(flag)
print("\\n" + "="*60)
print(f"FLAG: {flag_string}")
print("="*60)
`}
          language="python"
          fileName="reverse_flag.py"
          showLineNumbers={true}
        />

        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/calc_flag.png')}
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>
        

        <h1 className="text-2xl font-bold text-white mb-4">Challenge 02: Broken</h1>
        <p>Challenge is about the concept of broken binary which make us can't get the flag and always return <code className="bg-zinc-900 px-2 py-1 rounded text-red-500 font-mono text-xs">[*] Something went wrong!!</code>{''}</p>
        <p>Firstly, I tried to search in the strings of the binary about any error message, suspecious strings or any hints, but i got nothing, so i repeated the previous steps and opened the binary on ghidra and analyse it</p>

        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/broken_main_function.png')}
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>

        <p>Same as previous, lets take it to AI to make it human readable</p>
        <CodeBlock
          language="c"
          code={`uint64_t decode_and_print_secret(void)
{
    size_t encoded_length;
    int index;

    const char *encoded_reference =
        "\\x1b(\\x02) ,1:\\x19q\\x13\\b\\x0f\\x06\\x1e\\b\\x1b\\x1e\\x02qq\\r<";

    char *encoded_buffer = (char *)&DAT_00102004;

    encoded_length = strlen(encoded_reference);
    if (encoded_length != 22) {
        printf("[*] Something went wrong!!");
        exit(0);
    }

    for (index = 0; index < encoded_length; index++) {
        encoded_buffer[index] ^= 0x41;
        printf("\\x%x", (unsigned char)encoded_buffer[index]);
    }

    printf("\\n%s\\n", encoded_buffer);

    return 0;
}`}
        />
        <p>The main idea of the binary, validate the length of a specific encoded string and if it's valid, the program will decode it with XOR operation using 0x41 as the key.</p>

        <p>Now we can see the bug that cause the problem, is the program always check if the string's length equal to 22 Bytes (which is not), so it always prints the error message and exits.</p>
        <p>To Fix the problem we can do in different ways, we can edit on the check instruction and batch the file, or simply take the string as it and decode it manually</p>

        <h3 className="text-xl font-bold text-white mb-4">Manual Decoding Approach</h3>

        <p>To decode the string, we can use a simple script that decode each byte using the XOR key 0x41.</p>

        <CodeBlock
          language="python"
          code={`target = "\\x1b(\\x02) ,1:\\x19q\\x13\\b\\x0f\\x06\\x1e\\b\\x1b\\x1e\\x02qq\\r<"

flag = []

for i in range(len(target)):
    original_char = chr(ord(target[i]) ^ 0x41)
    flag.append(original_char)
    

flag_string = ''.join(flag)
print("\n" + "="*60)
print(f"FLAG: {flag_string}")
print("="*60)`}
        />

        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/broken_flag.png')}
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>

        
        
        
        
        
        <p className="text-center italic text-white-600 border-l-4 border-red-500 pl-6 py-4">
          {"Medium/Hard Level"}
        </p>

        <h1 className="text-2xl font-bold text-white mb-4">Challenge 01: Ilovec</h1>
        <p>And this challenge was very tricky due to multiple steps and layers - dynamic analysis and more, so please focus with me</p>
        <p>Firstly, i executed the binary  <InlineCode>./ilovec "test"</InlineCode> to see the output </p>
        <p>Output:</p>
        <CodeBlock 
          code={`Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!
Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!
Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!
Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Wrong!!Flag is correct.`}
          language="output"
        />

        <p>Lets start with the static analysis using Ghidra</p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/ilovec_main_function.png')}
            alt="Home page"
            className="w-full h-auto object-cover"
          />
        </div>
        <p>After Refinement:</p>
        <CodeBlock 
          code={`uint64_t validate_flag(uint64_t unused_arg, long argv_ptr)
{
    size_t pattern_length;
    int i;

    char pattern_buffer[40];
    char *user_input;

    // Stack canary
    long stack_cookie = *(long *)(in_FS_OFFSET + 0x28);

    // argv[1] → user input
    user_input = *(char **)(argv_ptr + 8);
    DAT_00104090 = (long)user_input;   // Used by custom qsort comparator

    // Initialize pattern
    strncpy(
        pattern_buffer,
        "KXXKX3XJXXXXXXNXXXXXBXXXXXAXXYY",
        0x20
    );

    pattern_length = strlen(pattern_buffer);
    qsort(
        pattern_buffer,
        pattern_length,
        sizeof(char),
        FUN_00101179
    );

    for (i = 0; i < 31; i++) {
        if (user_input[i] != (&DAT_00104060)[i]) {
            printf("Wrong!!");
        }
    }

    puts("Flag is correct.");

    // Stack integrity check
    if (stack_cookie != *(long *)(in_FS_OFFSET + 0x28)) {
        __stack_chk_fail();
    }

    return 0;
}

`}
          language="c"
          fileName="validate_flag.c"
          showLineNumbers={true}
        />

        <p>I initially understood that the binary take the input from the user `stored in <InlineCode>DAT_00104090</InlineCode>`  and pass it to qsort function with custom comparator and then compare the result with the expected pattern `stored in <InlineCode>DAT_00104060</InlineCode>` to validate the flag.</p>

        <p>I got the value of the expected pattern from the Bytes window (May be the pattern is the flag) by copying the 31 bytes starts at 0x00104060</p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/ilovec_string_bytes.png')}
            alt="String bytes"
            className="w-full h-auto object-cover"
          />
        </div>
        <p>We got 02311b303528231a6b070f181c6b07681e070a3144335f6a464633430c0a7d , which may be the flag in an encrypted form and we need to decrypt it</p>
        <p>Now Lets analyze the Comparison function <InlineCode>FUN_00101179</InlineCode></p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/ilovec_sorting_function.png')}
            alt="Comparison function"
            className="w-full h-auto object-cover"
          />
        </div>
        <p>After Refinement:</p>
        
        <CodeBlock
          language="c"
          code={`int custom_char_comparator(unsigned char *a, unsigned char *b)
{
    // Side-effect counter (global)
    if (xor_index < 31) {
        // XOR user input with pattern character
        user_input[xor_index] ^= a[xor_index];
        xor_index++;
    }

    // Comparator logic:
    // sort by (char % 7)
    return ((a[0] % 7) - (b[0] % 7));
}`}
        />
        <p>I asked the AI to understand the function and from the previous comparison logic, we got that it's not a traditional comparison, the function edit on the user input with XOR operations each time (Side Effect) and the comparison logic not fixed (it depends on the value of the characters modulo 7) which is not constant.</p>

        <p>So, we need a dynamic analysis to fully understand the behavior of the comparator and know how it edits on the user input</p>

        <p>Asked AI and it told me to use something called LD_PRELOAD that replace the comparison function and use another one (Same behavior but with logging) so we can see which position will be XORed and with which value</p>
        <CodeBlock
          language="c"
          code={`#define _GNU_SOURCE
#include <stdio.h>
#include <dlfcn.h>
#include <stddef.h>

static void (*real_qsort)(
    void*, size_t, size_t,
    int (*)(const void*, const void*)
);
static void *array_base;
static size_t call_num = 0;


static int xor_index = 0;

int wrapper_compare(const void *a, const void *b)
{
    unsigned char xor_byte = 0;

    if (xor_index < 31) {
        xor_byte = *((unsigned char *)a + xor_index);

        fprintf(stderr,
            "XOR %02d: using a[%02d] = 0x%02x\\n",
            xor_index, xor_index, xor_byte
        );

        xor_index++;
    }

    return (*(unsigned char*)a % 7) - (*(unsigned char*)b % 7);
}

void qsort(
    void *base,
    size_t n,
    size_t size,
    int (*cmp)(const void*, const void*)
)
{
    real_qsort = dlsym(RTLD_NEXT, "qsort");
    array_base = base;
    call_num = 0;
    xor_index = 0;

    real_qsort(base, n, size, wrapper_compare);
}`}
        />

        

        <CodeBlock 
          code={`gcc -shared -fPIC -o trace.so trace.c -ldl
LD_PRELOAD=./trace.so ./ilovec AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`}
          language="bash"
        />
        <p>Output:</p>
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/ilovec_x0r_pattern.png')}
            alt="Comparison function"
            className="w-full h-auto object-cover"
          />
        </div>        

        <p>So, what i understood that the binary will take the input and apply the XOR pattern on it and then compare with a stored string/expected value, which means</p>
        <p> <InlineCode>user_input ^ xor_pattern = expected_value</InlineCode> --- (user_input is the correct flag) and (expected_value is the encoded form of it)</p>
        <p>We have the XOR pattern and the expected value, so we can XOR them to get the user input (flag).</p>

                <CodeBlock 
          code={`xor_pattern = [
    0x58, 0x58, 0x58, 0x58, 0x58,  
    0x58, 0x58, 0x58, 0x58, 0x58,
    0x58, 0x58, 0x4e, 0x58, 0x58, 
    0x58, 0x58, 0x58, 0x59, 0x00,
    0x00, 0x00, 0x00, 0x59, 0x00,
    0x00, 0x00, 0x00, 0x58, 0x59,  
]

# Expected bytes (from the binary at address 0x104060)
expected = bytes.fromhex("02311b303528231a6b070f181c6b07681e070a3144335f6a464633430c0a7d")


flag = ""
for i in range(30):
    flag += chr(xor_pattern[i] ^ expected[i])
flag += chr(expected[30])  # Last byte not XORed

print("\\n"+"="*40) 
print(f"Flag: {flag}")
print("="*40)

`}
          language="python"
          fileName="decrypt_flag.py"
          showLineNumbers={true}
        />

         <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900 my-6">
          <img
            src={assetPath('/writeup-images/zinad-26-rev/ilovec_flag.png')}
            alt="Comparison function"
            className="w-full h-auto object-cover"
          />
        </div>
        <p>That's it for this writeup, hope you enjoyed it and learned something new. See you in the next one!</p>

    </div>
    </article>
    </SplitViewWrapper>
  )
}
