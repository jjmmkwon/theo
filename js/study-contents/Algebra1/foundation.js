
var input = "input"
var img = "image"

let fillInTheBlank = {
  "Variable & Expression" :  [],
  "Order of Operations & Evaluating Expressions" : [],
  "Solving Equation : add both sdies" : ["Q_1_0_4"],
  "Solving Systems Using Substitution" : ["Q_2_1_0", "Q_2_1_1", "Q_2_1_2", "Q_2_1_3", "Q_2_1_6", "Q_2_1_7"]
}

let study_contents = {
    //ChapterName     // SmallChapter         //Concept               //studyData
  "foundation" : { "Variable & Expression" : {"Variable Example" : ["<span class='bold'>Variable</span>", "<br><br>", "<span class='bold'>\\(x\\) + 20 </span><br> here, <span class='bold'>\\(x\\)</span> is a <span class='bold'>variable</span>"], //GRADE C & BELOW
                                              "Algebraic Expression1" : ["An <span class ='bold'>algebraic expression</span><br>is an expression that <br>includes one or more <span class='bold'>variables</span>"],
                                              "Algebraic Expression2" : ["In other words, <br>an <span class ='bold'>algebraic expression</span> <br>includes one ore more of <br>these alphabets :", "<br><br>", "\\(x, y, a, b, n ...\\)"],
                                              "Algebraic Expression Words Problem_1" : ["<span class='medium'>Now, </span><br><span class='bold'>29 </span>more than <span class='bold'>a number \\(x\\)</span>", "<br>", "<span class='medium'>can be written as </span>", "<br>", "<span class='bold'>\\(x\\)</span> + <span class='bold'>29</span>"],
                                              "Algebraic Expression Words Problem_2" : ["<span class='medium'>Likewise,</span><br><span class='bold'>17</span> times <span class='bold'>a number \\(y\\)</span>", "<br>", "<span class='medium'>can be written as : </span>", "<br>", "<span class='bold'>17\\(y\\)</span>"],
                                              "Q_0_0_0" : ["<span class='bold'>58 </span>less <span class='bold'>a number \\(n\\)</span>", "Q: The word phrase above can be written as"],
                                              "Q_0_0_1" : ["<span class='bold'>8 <span class='bold'> times <span class='bold'>a number \\(n\\)</span>", "Q: The word phrase above can be written as"],
                                              "Q_0_0_2" : ["The quotient of a number <span class='bold'>\\(n\\)</span> and <span class='bold'>5</span>", "Q: The word phrase above can be written as"],
                                              "Q_0_0_3" : ["<span class='bold'>3</span> more than twice <span class='bold'>a number \\(x\\)</span>", "Q: The word phrase above can be written as"],
                                              "Q_0_0_4" : ["<span class='bold'>9</span> more than <span class='bold'>10 times a number \\(x\\)</span>", "Q: The word phrase above can be written as"],
                                              "Q_0_0_5" : ["6.7 more than the product of 5 and \\(n\\)", "Q: The word phrase above can be written as"],
                                              "Q_0_0_6" : ["<span class='medium'>You and some friends are going to a museum. <br>Each ticket costs $4.50. You purchased a total of \\(n\\) tickets.</span>",  "Q: Write an expression that gives the total cost of buying \\(n\\) tickets."],
                                              "Q_0_0_7" : ["<span class='medium'>You and some friends are going to a museum. <br>Each ticket costs $4.50. You purchased a total of \\(n\\) tickets.</span>",  "Q: Now, suppose the total cost was $36. <br>What is the total cost if one more ticket is purchased?"],
                                              "Q_0_0_8" : ["", "Q: Which expression gives the value in dollars of \\(d\\) dimes?"],
                                              "Q_0_0_9" : ["\\(2(5-4)\\)", "Q: Is the above expression algebraic or numerical?"]
                                            },
                    "Order of Operations & Evaluating Expressions" : {
                                              "Power" : ["<span class='bold'>Power", "<br><br>", "\\(2^3 = 2 \\cdot 2 \\cdot 2\\)</span>", "<br><br>", "Here, \\(2^3\\) is called a <span class='bold'>power</span>"],
                                              "Power Explanation" : ["<span class='bold'>\\(2^3 = 2 \\cdot 2 \\cdot 2\\)</span>", "<br><br>", "<span class='bold'>Power </span><br>is used to <span class='bold'>shorten </span><br>how you represent <br><span class='bold'>repeated multiplication</span>."],
                                              "Power Two Parts" : ["A power has <span class='bold'>two</span> parts"],
                                              "Base and Exponent" : ["A power has <span class='bold'>two</span> parts", "<br>", "1. <span class='bold'>Base</span> <br>2. <span class='bold'>Exponent</span>"],
                                              "Base and Exponent Example" : ["<span class='bold'>\\(2^3\\)</span>", "<br>", "1. here, \\(2\\) is the <span class='bold'>base</span> <br>2.and <span class='bold'>3</span> is the <span class='bold'>exponent</span>"],
                                              "Reading Power" : ["<span class='bold'>\\(2^3\\)</span>", "<br>", "<span class='medium grey'>You read it as</span><br>'Two <span class='bold'>to the</span> third <span class='bold'>power</span>'<br><span class='medium grey'>or</span><br>'Two cubed'"],
                                              "Simplify Numerical Expressions" : ["<span class='bold'>Simplify</span>", "<br>", "<span class='medium grey'>You will see this word a lot in your homeworks and quizzes</span>", "<br>", "You simplify an numerical expression <br>when you replace it with its <span class='bold'>single numerical value</span>"],
                                              "Simplify Example1" : ["<span class='bold'>Simplify \\(3^2\\) </span>", "<br>", "\\(3^2\\)\\(= 3 \\cdot 3\\)", "<br>", "\\(= 9 \\)", "<br>", "<span class='medium'>So the answer is 9 </span>"],
                                              "Simplify Example2" : ["<span class='bold'>Simplify \\(0.5^3\\) </span>", "<br>", "\\(= 0.5 \\cdot 0.5 \\cdot 0.5\\)", "<br>", "\\(= 0.125 \\)"],
                                              "Q_0_1_0" : ["\\(4^2\\)", "Q: Simplify the above numerical expression"],
                                              "Q_0_1_1" : ["\\(\\left(2 \\over 3\\right)^3\\)", "Q: Simplify the above numerical expression"],
                                            },
                    "Real Numbers and the Number Line" : {}
                  },
  "singleVarEquation": {
                    "Solving Equation : add both sdies" :  {
                                              "Example of one step equation1" : ["<span class='bold'>\\(x - 3 = 2 \\)", "<br>", "</span>Solving an equation for \\(x\\)<br> means figuring out what \\(x\\) is."],
                                              "Example of one step equation2" : ["<span class='bold'>\\(x - 3 = 2 \\)", "</span>⇩", "\\(x = \\) something", "<br>This is what we want to do."],
                                              "Example of one step equation3" : ["<span class='bold'>\\(x\\) <span class ='red'>\\( - 3\\)</span>  \\(= 2 \\)", "<br>", "</span>In the equation above, <br>we want to eleminate <span class ='red'>\\(-3\\)</span> <br>to make it into", "<br>\\(x = \\) something"],
                                              "Example of one step equation4" : ["<span class='bold'>\\(x - 3\\) <span class ='red'>\\(+ 3\\)</span>  \\(= 2 \\) </span>", "<br>", "<span class ='red'>\\(+3\\)</span> on the left side."],
                                              "Example of one step equation5" : ["<span class='bold'>\\(x - 3\\) <span class ='red'>\\(+ 3\\)</span>  \\(= 2 \\)<span class ='red'>\\( + 3\\)</span> </span>", "<br>", "And to the right side as well"],
                                              "Example of one step equation6" : ["<span class='bold'>\\(x - 3\\) <span class ='red'>\\(+ 3\\)</span>  \\(= 2 \\)<span class ='red'>\\( + 3\\)</span></span>", "<br>", "Now,", "<br>", "<span class='bold'>\\(x = \\)&nbsp<span class='underline'>\\(5\\)</span></span><br><br>Thus the answer is 5"],
                                              "Q_1_0_0" : ["\\(x - 10 = 15\\)", "Q: What value should you add <br>on both sides of the equation <br>to solve for \\(x\\)?"],
                                              "Q_1_0_1" : ["\\(x - 10 \\) <span class ='red'>\\( + 10\\)</span>\\(= 15\\)<span class ='red'>\\( + 10\\)</span>", "Q: Now, what is the value of \\(x\\)?"],
                                              "Q_1_0_2" : ["\\(x - 7 = 3\\)", "Q: What value should you add <br>on both sides of the equation <br>to solve for \\(x\\)?"],
                                              "Q_1_0_3" : ["\\(x - 7 \\)<span class ='red'>\\( + 7\\)</span>\\(= 3\\)<span class ='red'>\\( + 7\\)</span>", "Q: Now, what is the value of \\(x\\)?"],
                                              "Q_1_0_4" : {
                                                            "numberOfSteps" : 2,
                                                            "Q" : ["\\(x - 20 = 3 \\) ", "Q: Fill in the blank(s) below to solve for \\(x\\)"],
                                                            "1_txt" : "Add the same number to the both sides of the equation to isolate \\(x\\)",
                                                            "1_fill" : ["\\(x - 20 \\) &nbsp;\\(+\\)&nbsp;", input, "\\(= 3 \\) &nbsp;\\(+\\) &nbsp;", input],
                                                            "1_fill_size" : [0, 60, 0, 60],
                                                            "2_txt"  : "Thus,",
                                                            "2_fill" : ["\\(x =\\) &nbsp;", input],
                                                            "2_fill_size" : [4],
                                                            "numberOfInputs" : 2,
                                                            "answer": ["20", "20", "32"]
                                                          },

                                              "Q_1_0_5" : ["\\(x - 3 = 10\\)", "Q: What is the value of \\(x\\)?"],
                                              "Q_1_0_6" : ["\\(x - 12 = -2\\)", "Q: What is the value of \\(x\\)?"],
                                              "Q_1_0_7" : ["\\(x - 20 = 4\\)", "Q: What is the value of \\(x\\)?"]
                                            },
                    "Solving Equation : subtract both sdies" :  {
                                              "subtract1" : ["<span class='bold'>\\(x + 2 = 4 \\)", "<br>", "</span>To solve the equation above, <br>we need to get rid of \\(2\\) next to \\(x\\)"],
                                              "subtract2" : ["<span class='bold'>\\(x + 2 \\) <span class ='red'>\\(- 2\\)</span>  \\(= 4 \\)</span>", "<br>", "<span class ='red'>\\(- 2\\)</span> on the left side."],
                                              "subtract3" : ["<span class='bold'>\\(x + 2\\) <span class ='red'>\\(- 2\\)</span>  \\(= 4 \\)<span class ='red'>\\( - 2\\)</span> </span>", "<br>", "And to the right side as well"],
                                              "subtract4" : ["<span class='bold'>\\(x + 2\\) <span class ='red'>\\(- 2\\)</span>  \\(= 4 \\)<span class ='red'>\\( - 2\\)</span></span>", "<br>", "Now, ", "<br>", "<span class='bold'>\\(x = \\)&nbsp<span class='underline'>\\(2\\)</span></span>",  "<br>", "Thus the answer is 2"],
                                              "Q_1_1_0" : ["\\(x + 3 = 7\\)", "Q: What value should you subtract <br>on both sides of the equation <br>to solve for \\(x\\)?"],
                                              "Q_1_1_1" : ["\\(x + 3 \\) <span class ='red'>\\( - 3\\)</span>\\(= 7\\)<span class ='red'>\\( - 3\\)</span>", "Q: Now, what is the value of \\(x\\)?"],
                                              "Q_1_1_2" : ["\\(x + 24 = 3\\)", "Q: What value should you subtract <br>on both sides of the equation <br>to solve for \\(x\\)?"],
                                              "Q_1_1_3" : ["\\(x + 24 \\)<span class ='red'>\\( - 24\\)</span>\\(= 3\\)<span class ='red'>\\( - 24\\)</span>", "Q: Now, what is the value of \\(x\\)?"],
                                              "Q_1_1_4" : ["\\(x + 6 = 10\\)", "Q: What is the value of \\(x\\)?"],
                                              "Q_1_1_5" : ["\\(x + 18 = -5\\)", "Q: What is the value of \\(x\\)?"],
                                              "Q_1_1_6" : ["\\(x + 11 = -2\\)", "Q: What is the value of \\(x\\)?"]
                                            }
                  },
  "twoVarEquation" : {
                    "Solving Systems by Graphing" :  {
                                              "Solving system of equations" : ["<span class='bold'>Systems of equations</span> <br>can be solved <br>in <span class='bold'>more than one way</span>"],
                                              "Solving by graphing1" : ["<span class='bold'>1. By Graphing</span>", "\\(y = x + 2\\)<br>\\(y = 3x - 2\\)", "<br>one way of solving <br> a system of equation is<br>by <span class ='bold'>graphing</span> them<br>and finding an <span class='bold'>intersection</span>"],
                                              "Solving by graphing2" : ["<span class='bold'>1. By Graphing</span>", "\\(y = x + 2\\)<br>\\(y = 3x - 2\\)", "<br><span class='medium'>① Graph the first equation: \\(y = x + 2\\)</span>", img],
                                              "Solving by graphing2_img_urls" : ["", "", "", "twoVarEquation_0/y=x+2.png"],
                                              "Solving by graphing2_img_sizes" : [[], [], [], ["307px", "328px"]],
                                              "Solving by graphing3" : ["<span class='bold'>1. By Graphing</span>", "\\(y = x + 2\\)<br>\\(y = 3x - 2\\)", "<br><span class='medium'>② Graph the second equation: \\(y = 3x - 2\\) <br> in the same coordinate </span>", img],
                                              "Solving by graphing3_img_urls" : ["", "", "", "twoVarEquation_0/y=3x-2.png"],
                                              "Solving by graphing3_img_sizes" : [[], [], [], ["307px", "328px"]],
                                              "Solving by graphing4" : ["<span class='bold'>1. By Graphing</span>", "\\(y = x + 2\\)<br>\\(y = 3x - 2\\)", "<br><span class='medium'>③ Find the intersection: (2, 4)</span>", img],
                                              "Solving by graphing4_img_urls" : ["", "", "", "twoVarEquation_0/y=x+2 y=3x-2 intersection.png"],
                                              "Solving by graphing4_img_sizes" : [[], [], [], ["307px", "328px"]],
                                              "Solving by graphing5" : ["<span class='bold'>1. By Graphing</span>", "\\(y = x + 2\\)<br>\\(y = 3x - 2\\)", "<br><span class = 'medium'>④ Now, plug in x = 2 and y = 4 <br>to see if (2, 4) makes both equations true.</span><br><br>", img, "<span class = 'medium'><span class = 'green'>\\(y = x + 2\\)</span><br>\\(4 = 2 + 2\\)<br>\\(4 = 4\\) ✔️</span>", "<span class='medium'><span class = 'yellow'>\\(y = 3x - 2\\)</span><br>\\(4 = 3(2) - 2\\)<br>\\(4 = 4\\) ✔️</span>", "<span class='medium'>Thus, the solution is (2, 4)</span>"],
                                              "Solving by graphing5_style" : ["", "", "", "", "inlineBlock left margin-right-50", "inlineBlock left margin-right-50", "inlineBlock"],
                                              "Solving by graphing5_img_urls" : ["", "", "", "twoVarEquation_0/y=x+2 y=3x-2 intersection.png"],
                                              "Solving by graphing5_img_sizes" : [[], [], [], ["307px", "328px"]],
                                              "Q_2_0_0" : ["\\(y = -x - 4\\)<br>\\(y = 4x + 1\\)", "Q: What is the solution of the equation?"],
                                              "Q_2_0_0_img_url" : "twoVarEquation_0/intersection_0.png",
                                              "Q_2_0_0_img_sizes" : ["307px", "328px"],
                                              "Q_2_0_1" : ["\\(y = \\dfrac{1}{3}x + 1\\)<br>\\(y = -3x + 11\\)", "Q: What is the solution of the equation?"],
                                              "Q_2_0_1_img_url" : "twoVarEquation_0/intersection_1.png",
                                              "Q_2_0_1_img_sizes" : ["360px", "388px"],
                                              "Q_2_0_2" : ["\\(y = -x + 3\\)<br>\\(y = x + 1\\)", "Q: What is the solution of the equation?"],
                                              "Q_2_0_2_img_url" : "twoVarEquation_0/intersection_2.png",
                                              "Q_2_0_2_img_sizes" : ["360px", "388px"],
                                              "Q_2_0_3" : ["\\(y = x - 4\\)<br>\\(y = -x\\)", "Q: Which one of the following shows the graph and the intersection right?"],
                                              "Q_2_0_3_answer_img_urls" : ["twoVarEquation_0/solveWithGraph_0.png", "twoVarEquation_0/solveWithGraph_0_b.png"],
                                              "Q_2_0_3_answer_img_sizes" : ["360px", "388px"],
                                              "Q_2_0_4" : ["\\(y = -x + 3\\)<br>\\(y = x + 1\\)", "Q: Which one of the following shows the graph and the intersection right?"],
                                              "Q_2_0_4_answer_img_urls" : ["twoVarEquation_0/solveWithGraph_1.png", "twoVarEquation_0/solveWithGraph_1_b.png"],
                                              "Q_2_0_4_answer_img_sizes" : ["360px", "388px"],
                                              "Q_2_0_5" : ["\\(y = 2x + 5\\)<br>\\(y = -2x + 1\\)", "Q: Which one of the following shows the graph and the intersection right?"],
                                              "Q_2_0_5_answer_img_urls" : ["twoVarEquation_0/solveWithGraph_2_b.png", "twoVarEquation_0/solveWithGraph_2.png"],
                                              "Q_2_0_5_answer_img_sizes" : ["360px", "388px"]

                                              // "DoYouKnow_linear graph1" : ["Before we move on to questions, <br>do you know <br><span class='bold'>how to graph an equation?</span>"],
                                              // "DoYouKnow_linear graph_no" : "DoYouKnow_linear graph2",
                                              // "DoYouKnow_linear graph2" : ["That's okay, I will walk you through, <br>because this is an important concept. <br><br>Can you grab a pencil and a piece of paper now?"],
                                              // "DoYouKnow_linear graph_yes" : ["Great<br><br>Draw the x coordinate just like shown below", img]

                                            },
                    "Solving Systems Using Substitution" : {
                                              "Solving with substitution1" : ["<span class='bold'>2. By Substitution</span>", "\\(y = 3x\\)<br>\\(x + y = 12\\)", "<br>If <span class='bold'>one equation</span> is <br><span class='bold'>already solved for one variable</span>, <br>just like \\(y = 3x\\) above, <br>use it for the <span class='bold'>substitution</span>"],
                                              "Solving with substitution2" : ["<span class='bold'>2. By Substitution</span>", "\\(y = 3x\\)<br>\\(x + y = 12\\)", "<br>① Since \\(y = 3x\\), you can <br><span class='bold'>substitute \\(3x\\) for \\(y\\) in</span><br>\\(x + y = 12\\)<br><br>② Then, it is now<br> \\(x + 3x = 12\\)<br><br>③ Thus, <br>\\(4x = 12\\) <br><br>④ If you divide each side by 4, <br>\\(x = 3\\)"],
                                              "Solving with substitution3" : ["<span class='bold'>2. By Substitution</span>", "\\(y = 3x\\)<br>\\(x + y = 12\\)", "<br>⑤ So, \\(x = 3\\). <br>Now, <span class='bold'>substitute \\(3\\) for \\(x\\)</span> <br>in \\(y = 3x\\) <br><span class='bold'>to solve for \\(y\\)</span> <br><br>⑥ So, <br>\\(y = 3(3) = 9\\) <br><br>Thus, the solution is<br>\\((3, 9)\\)"],
                                              "Q_2_1_0" : {
                                                            "numberOfSteps" : 4,
                                                            "Q" : ["\\(y = 3x\\)<br>\\(x + y = 8\\)", "Q: Solve the equations above for \\(x\\) and \\(y\\)"],
                                                            "1_txt" : "From the first equation, \\(y = 3x\\). So, substitue \\(3x\\) for \\(y\\) in the second equation",
                                                            "1_fill" : ["\\(x + \\)&nbsp;", input, "&nbsp;\\(= 8\\)"],
                                                            "1_fill_size" : [0, 40, 0],
                                                            "2_txt"  : "Then, \\(4x = 8\\) <br>",
                                                            "2_fill" : ["Thus,&nbsp \\(x = \\)&nbsp;", input],
                                                            "2_fill_size" : [0, 30],
                                                            "3_txt"  : "Now, plug in the value of \\(x\\) to the first equation to get \\(y\\)",
                                                            "3_fill" : ["\\(y = 3(\\)", input, "\\()\\)", "&nbsp;Thus, \\(y = \\)", input],
                                                            "3_fill_size" : [0, 30, 0, 0, 30],
                                                            "4_txt"  : "Thus, the answer is",
                                                            "4_fill" : ["(", input, ",&nbsp;", input, ")"],
                                                            "4_fill_size" : [0, 30, 0, 30, 0],
                                                            "answer": ["3x", "2", "2", "6", "2", "6"]
                                                          },
                                              "Q_2_1_1" : {
                                                            "numberOfSteps" : 4,
                                                            "Q" : ["\\(2x + 2y = 38\\)<br>\\(y = x + 3\\)", "Q: Solve the equations above for \\(x\\) and \\(y\\)"],
                                                            "1_txt" : "From the second equation, \\(y = x + 3\\). So, substitue \\(x + 3\\) for \\(y\\) in the second equation",
                                                            "1_fill" : ["\\(2x + 2(\\)", input, "\\() = 38\\)"],
                                                            "1_fill_size" : [0, 80, 0],
                                                            "2_txt"  : "Thus,",
                                                            "2_fill" : ["\\(x = \\)", input],
                                                            "2_fill_size" : [0, 30],
                                                            "3_txt"  : "Now, plug in the value of \\(x\\) to the second equation to get \\(y\\)",
                                                            "3_fill" : ["\\(y = \\)", input, "\\( + 3\\) Thus, \\(y = \\)", input],
                                                            "3_fill_size" : [0, 30, 0, 40],
                                                            "4_txt"  : "Thus, the answer is",
                                                            "4_fill" : ["(", input, ",&nbsp;", input, ")"],
                                                            "4_fill_size" : [0, 30, 0, 40, 0],
                                                            "answer": ["x+3", "8", "8", "11", "8", "11"]
                                                          },
                                              "Q_2_1_2" : {
                                                            "numberOfSteps" : 3,
                                                            "Q" : ["\\(y = 2x\\)<br>\\(y = x - 17\\)", "Q: Solve the equations above for \\(x\\) and \\(y\\)"],
                                                            "1_txt" : "Substitute \\(2x\\) for \\(y\\) in the second equation and solve for \\(x\\)",
                                                            "1_fill" : ["\\(x =\\) &nbsp;", input],
                                                            "1_fill_size" : [0, 60],
                                                            "2_txt"  : "Now, plug in \\(x\\) value to the first equation and solve for \\(y\\)",
                                                            "2_fill" : ["\\(y =\\) &nbsp;", input],
                                                            "2_fill_size" : [0, 60],
                                                            "3_txt"  : "Thus, the answer is",
                                                            "3_fill" : ["(", input, ",&nbsp;", input, ")"],
                                                            "3_fill_size" : [0, 60, 0, 60, 0],
                                                            "answer": ["-17", "-34", "-17", "-34"]
                                                          },
                                              "Q_2_1_3" : {
                                                            "numberOfSteps" : 3,
                                                            "Q" : ["\\(x + 2y = 30\\)<br>\\(y = x - 3\\)", "Q: Solve the equations above for \\(x\\) and \\(y\\)"],
                                                            "1_txt" : "Substitute \\(x - 3\\) for \\(y\\) in the first equation and solve for \\(x\\)",
                                                            "1_fill" : ["\\(x =\\) &nbsp;", input],
                                                            "1_fill_size" : [0, 45],
                                                            "2_txt"  : "Now, plug in \\(x\\) value to the second equation and solve for \\(y\\)",
                                                            "2_fill" : ["\\(y =\\) &nbsp;", input],
                                                            "2_fill_size" : [0, 45],
                                                            "3_txt"  : "Thus, the answer is",
                                                            "3_fill" : ["(", input, ",&nbsp;", input, ")"],
                                                            "3_fill_size" : [0, 45, 0, 45, 0],
                                                            "answer": ["12", "9", "12", "9"]
                                                          },
                                              "Q_2_1_4" : ["\\(y = 3x - 11 \\)<br> \\(y = 2x - 13\\)", "Q: What are the values of \\(x\\) and \\(y\\)?"],
                                              "Q_2_1_5" : ["\\(y = 2x + 3 \\)<br> \\(3y - 2y = 5\\)", "Q: What are the values of \\(x\\) and \\(y\\)?"],
                                              "Q_2_1_6" : {
                                                            "numberOfSteps" : 1,
                                                            "Q" : ["\\(y = 8 - x\\)<br>\\(7 = 2 - y\\)", "Q: Solve the equations above for \\(x\\) and \\(y\\)"],
                                                            "1_fill" : ["\\(x =\\) &nbsp;", input, "\\(y =\\) &nbsp;", input],
                                                            "1_fill_size" : [0, 45, 0, 45],
                                                            "answer": ["13","-5"]
                                                          },
                                              "Q_2_1_7" : {
                                                            "numberOfSteps" : 1,
                                                            "Q" : ["\\(3x + y = 24\\)<br>\\(y = x + 4\\)", "Q: Solve the equations above for \\(x\\) and \\(y\\)"],
                                                            "1_fill" : ["\\(x =\\) &nbsp;", input, "\\(y =\\) &nbsp;", input],
                                                            "1_fill_size" : [0, 45, 0, 45],
                                                            "answer": ["5","9"]
                                                          }
                                            },
                }
}

let study_btns = {
  "foundation" : { "Variable & Expression" : {
                                              "Variable Example" : 1,
                                              "Algebraic Expression1" : 2,
                                              "Algebraic Expression2" : 1,
                                              "Algebraic Expression Words Problem_1" : 1,
                                              "Algebraic Expression Words Problem_2" : 2,
                                              "Q_0_0_0" : 0,
                                              "Q_0_0_1" : 0,
                                              "Q_0_0_2" : 0,
                                              "Q_0_0_3" : 0,
                                              "Q_0_0_4" : 0,
                                              "Q_0_0_5" : 0,
                                              "Q_0_0_6" : 0,
                                              "Q_0_0_7" : 0,
                                              "Q_0_0_8" : 0,
                                              "Q_0_0_9" : 0

                                            },
                    "Order of Operations & Evaluating Expressions" : {
                        "Power" : 2,
                        "Power Explanation" : 1,
                        "Power Two Parts" : 2,
                        "Base and Exponent" : 2,
                        "Base and Exponent Example" : 2,
                        "Reading Power" : 2,
                        "Simplify Numerical Expressions" : 2,
                        "Simplify Example1" : 1,
                        "Simplify Example2" : 2,
                        "Q_0_1_0" : 0,
                        "Q_0_1_1" : 0
                    },
                    "Real Numbers and the Number Line" : {}
                  },
  "singleVarEquation" : {
                    "Solving Equation : add both sdies" : {
                                                          "Example of one step equation1" : 2,
                                                          "Example of one step equation2" : 1,
                                                          "Example of one step equation3" : 1,
                                                          "Example of one step equation4" : 1,
                                                          "Example of one step equation5" : 1,
                                                          "Example of one step equation5" : 1,
                                                          "Q_1_0_0" : 0,
                                                          "Q_1_0_1" : 0,
                                                          "Q_1_0_2" : 0,
                                                          "Q_1_0_3" : 0,
                                                          "Q_1_0_4" : 0,
                                                          "Q_1_0_5" : 0,
                                                          "Q_1_0_6" : 0,
                                                          "Q_1_0_7" : 0
                                                        },
                    "Solving Equation : subtract both sdies" : {
                                                          "subtract1" : 1,
                                                          "subtract2" : 1,
                                                          "subtract3" : 1,
                                                          "subtract4" : 1,
                                                          "Q_1_1_0" : 0,
                                                          "Q_1_1_1" : 0,
                                                          "Q_1_1_2" : 0,
                                                          "Q_1_1_3" : 0,
                                                          "Q_1_1_4" : 0,
                                                          "Q_1_1_5" : 0,
                                                          "Q_1_1_6" : 0
                                                          }

                    },
  "twoVarEquation" : {
                    "Solving Systems by Graphing" :  {
                                                      "Q_2_0_0" : 0,
                                                      "Q_2_0_1" : 0,
                                                      "Q_2_0_2" : 0,
                                                      "Q_2_0_3" : 0,
                                                      "Q_2_0_4" : 0,
                                                      "Q_2_0_5" : 0
                                                      },
                    "Solving Systems Using Substitution"  : {
                                                          "Q_2_1_0" : 0,
                                                          "Q_2_1_1" : 0,
                                                          "Q_2_1_2" : 0,
                                                          "Q_2_1_3" : 0,
                                                          "Q_2_1_4" : 0,
                                                          "Q_2_1_5" : 0,
                                                          "Q_2_1_6" : 0,
                                                          "Q_2_1_7" : 0
                                                          }
                    }
}


let dontGetItBtns = {
  "Variable Example_0" : 1,
  "Variable Example_1": 2,
  "Algebraic Expression2_0" : 1
}

let chapters = ["foundation", "singleVarEquation", "twoVarEquation"]

let smallChapters = {
  "foundation" : [ "Variable & Expression",
                    "Order of Operations & Evaluating Expressions",
                    "Real Numbers and the Number Line"
                  ],
  "singleVarEquation" : [
                    "Solving Equation : add both sdies",
                    "Solving Equation : subtract both sdies"
                  ],

  "twoVarEquation" : [
                    "Solving Systems by Graphing",
                    "Solving Systems Using Substitution"
                  ]
}

let dontGetItContents = {
  "Variable Example_0" : "So, <br><br>in <span class='bold'>\\(x\\) + 20</span>, </span><br><br><span class='bold'>20</span> is a quantity that doesn't vary.<br>Thus <span class='bold'>20</span> is not a variable. <br>It's a constant.",
  "Variable Example_1" : "On the other hand, <br><br> in <span class='bold'>\\(x\\) + 20, </span><br><br>we don't know what \\(x\\) is.<br>In other words, <br>the value of \\(x\\) can vary. <br> Thus the name variable.",

  "Algebraic Expression2_0" : "Okay, <br><br> \\(x\\) + 20 is an algebraic expression <br>because it has a variable, \\(x\\), right?",
  "Algebraic Expression2_1" : "But <br> an expression like <br><br> \\(20 + 5\\) <br><br> is <span class='bold'>not</span> an algebraic expression <br> because it doesn't have a variable, <br> and only has constant numbers, <br>\\(20\\) and \\(5\\)",

  "Algebraic Expression Words Problem_1_0" : "Okay, <br> 29 more than 5 <br>can be written as <br>\\(5 + 29\\)",
  "Algebraic Expression Words Problem_1_1" : "Likewise, <br>29 more than a number \\(x\\) <br>can be written as <br><span class='bold'>\\(x\\) + 29 </span><br>We don't know what \\(x\\) is. But that's okay. <br>We just want to add 29 to it, <br>so that's what we did.",

  "Power Explanation_0" : "Think about <br>\\(2 \\cdot 2 \\cdot 2\\ cdot 2\\ cdot 2\\ cdot 2\\ cdot 2\\ cdot 2\\) <br>It's too long <br><br> So people came up with <br>what's called <span class='bold'>power</span><br>to shorten it",

  "Simplify Example1_0" : "\\(3^2\\) means <br>multiply 3 two times <br><br>Thus<br> \\(3^2\\) = \\(3 \\cdot 3\\) <br> = 9",
  "Simplify Example1_1" : "\\(3^2\\) could seem simple enough<br> But, when a question tells you to <span class='bold'> simplify</span> it, <br>what it wants is a <span class='bold'>single number</span> like 9, <br>not a power like \\(3^2\\)"

}

let questionAnswers = {
  "Q_0_0_0" : ["\\(58 - n\\)", "\\(58 - x\\)"],
  "Q_0_0_1" : ["\\(8n\\)", "\\(8 + n\\)"],
  "Q_0_0_2" : ["\\(n \\over 5\\)", "\\(5 \\over n \\)"],
  "Q_0_0_3" : ["\\(2 + 3x\\)", "\\(3 + 2x\\)"],
  "Q_0_0_4" : ["\\(10x + 9\\)", "\\(10 - 9x\\)"],
  "Q_0_0_5" : ["6.7\\(n\\) + 5", "5\\(n\\) + 6.7"],
  "Q_0_0_6" : ["$4.5 + \\(n\\)", "$4.5\\(n\\)"],
  "Q_0_0_7" : ["$40.5", "$45.0"],
  "Q_0_0_8" : ["\\(0.10 \\over d\\)", "0.1\\(d\\)"],
  "Q_0_0_9" : ["Algebraic", "Numerical"],

  "Q_0_1_0" : ["8", "16"],
  "Q_0_1_1" : ["\\(8 \\over 27\\)", "\\(2 \\over 27\\)"],

  //SOLVE SINGLE VARIABLE EQUATION//
  "Q_1_0_0" : ["\\(15\\)", "\\(10\\)"],
  "Q_1_0_1" : ["\\(25\\)", "\\(20\\)"],
  "Q_1_0_2" : ["\\(7\\)", "\\(4\\)"],
  "Q_1_0_3" : ["\\(17\\)", "\\(10\\)"],
  "Q_1_0_4" : [],
  "Q_1_0_5" : ["\\(11\\)", "\\(13\\)"],
  "Q_1_0_6" : ["\\(10\\)", "\\(-14\\)"],
  "Q_1_0_7" : ["\\(16\\)", "\\(24\\)"],

  "Q_1_1_0" : ["\\(3\\)", "\\(7\\)"],
  "Q_1_1_1" : ["\\(3\\)", "\\(4\\)"],
  "Q_1_1_2" : ["\\(3\\)", "\\(24\\)"],
  "Q_1_1_3" : ["\\(-19\\)", "\\(-21\\)"],
  "Q_1_1_4" : ["\\(10\\)", "\\(4\\)"],
  "Q_1_1_5" : ["\\(-18\\)", "\\(-23\\)"],
  "Q_1_1_6" : ["\\(9\\)", "\\(-13\\)"],


  //twoVarEquation//
  "Q_2_0_0" : ["\\((-1, -3)\\)", "\\((-3, -1)\\)"],
  "Q_2_0_1" : ["\\((2, 3)\\)", "\\((3, 2)\\)"],
  "Q_2_0_2" : ["\\((-2, 3)\\)", "\\((4, 9)\\)"],
  "Q_2_0_3" : ["", ""],
  "Q_2_0_4" : ["", ""],
  "Q_2_0_5" : ["", ""],

  "Q_2_1_4" : ["\\((2, -5)\\)", "\\((-2, -17)\\)"],
  "Q_2_1_5" : ["\\((-11, -19)\\)", "\\((11, 24)\\)"]
}

let questionMaxTimeForIntervention = { // in seconds
  "Q_0_0_0" : 30,
  "Q_0_0_1" : 30,
  "Q_0_0_2" : 49,
  "Q_0_0_3" : 30,
  "Q_0_0_4" : 49,
  "Q_0_0_5" : 49,
  "Q_0_0_6" : 60,
  "Q_0_0_7" : 60,
  "Q_0_0_8" : 30,
  "Q_0_0_9" : 20,

  "Q_0_1_0": 20,
  "Q_0_1_1": 40
}

let correctAnswers = {
  "Q_0_0_0" : 1,
  "Q_0_0_1" : 1,
  "Q_0_0_2" : 1,
  "Q_0_0_3" : 2,
  "Q_0_0_4" : 1,
  "Q_0_0_5" : 2,
  "Q_0_0_6" : 2,
  "Q_0_0_7" : 1,
  "Q_0_0_8" : 2,
  "Q_0_0_9" : 2,

  "Q_0_1_0" : 2,
  "Q_0_1_1" : 1,

  // SOLVE SINGLE VARIABLE EQUATION///////////
  //// 0 is non multiple question, just a placeholder
  "Q_1_0_0" : 2,
  "Q_1_0_1" : 1,
  "Q_1_0_2" : 1,
  "Q_1_0_3" : 0,
  "Q_1_0_4" : 2,
  "Q_1_0_5" : 2,
  "Q_1_0_6" : 1,
  "Q_1_0_7" : 2,

  "Q_1_1_0" : 1,
  "Q_1_1_1" : 2,
  "Q_1_1_2" : 2,
  "Q_1_1_3" : 2,
  "Q_1_1_4" : 2,
  "Q_1_1_5" : 2,
  "Q_1_1_6" : 2,

  // SOLVE TWO VARIABLE EQUATION///////////
  "Q_2_0_0" : 1,
  "Q_2_0_1" : 2,
  "Q_2_0_2" : 2,
  "Q_2_0_3" : 1,
  "Q_2_0_4" : 1,
  "Q_2_0_5" : 2,

  "Q_2_1_4" : 2,
  "Q_2_1_5" : 1
}
