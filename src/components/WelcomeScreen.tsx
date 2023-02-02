import {useNavigate} from "react-router-dom";

import syntaxHighlight from '../css/syntax-highlighting.gif'
import navigationBar from '../css/navigation-bar.png'
import smartlayout from '../css/smart-layout.png'
import scrollSynced from '../css/scroll-sync.gif'
import providers from '../css/providers.png'
import workspace from '../css/workspace.png'
import discussion from '../css/discussion.png'
import gfm from '../css/gfm.png'
import katex from '../css/katex.gif'
import mermaid from '../css/mermaid.gif'
import abc from '../css/abc.png'
import tweemoji from '../css/twemoji.png'

import "../css/landing.css"
import React, {useRef} from "react";

export const WelcomeScreen = ()=> {
    const navigate = useNavigate()
    const scrollTo = useRef<HTMLDivElement>(null)

    return <div className="landing" id="landing">
        <div className="navigation-bar">
            <a className="navigation-bar__button button" onClick={()=>navigate("/app")} title="The app">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                    <path
                        d="M 16.8363,2.73375C 16.45,2.73375 16.0688,2.88125 15.7712,3.17375L 13.6525,5.2925L 18.955,10.5962L 21.0737,8.47625C 21.665,7.89 21.665,6.94375 21.0737,6.3575L 17.895,3.17375C 17.6025,2.88125 17.2163,2.73375 16.8363,2.73375 Z M 12.9437,6.00125L 4.84375,14.1062L 7.4025,14.39L 7.57875,16.675L 9.85875,16.85L 10.1462,19.4088L 18.2475,11.3038M 4.2475,15.0437L 2.515,21.7337L 9.19875,19.9412L 8.955,17.7838L 6.645,17.6075L 6.465,15.2925"></path>
                </svg>
                Start writing
            </a>
        </div>
        <div className="splash-screen">
            <div className="splash-screen__logo">
                <div className="splash-screen__subtitle">
                    In-browser Markdown editor

                    <div className="social">
                        <a href="https://github.com/SamTV12345/stackedit-react" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                                <path
                                    d="M 11.9991,2C 6.47774,2 2.00001,6.47712 2.00001,12.0006C 2.00001,16.4184 4.86504,20.1665 8.83877,21.489C 9.33909,21.5807 9.52142,21.272 9.52142,21.007C 9.52142,20.7696 9.51282,20.1407 9.50791,19.3062C 6.72636,19.9105 6.13948,17.9657 6.13948,17.9657C 5.68459,16.8105 5.02895,16.5029 5.02895,16.5029C 4.121,15.8824 5.09771,15.895 5.09771,15.895C 6.10143,15.9657 6.62936,16.9256 6.62936,16.9256C 7.52135,18.4537 8.97014,18.0125 9.53984,17.7565C 9.63069,17.1102 9.88914,16.6696 10.1746,16.4196C 7.95415,16.1672 5.61952,15.3093 5.61952,11.4773C 5.61952,10.3856 6.00934,9.49292 6.64902,8.79388C 6.54588,8.54089 6.20271,7.52417 6.74723,6.14739C 6.74723,6.14739 7.58643,5.87851 9.49686,7.17252C 10.2943,6.95073 11.1501,6.8398 12.0003,6.83594C 12.8499,6.8398 13.7051,6.95073 14.5038,7.17252C 16.413,5.87851 17.2509,6.14739 17.2509,6.14739C 17.7967,7.52417 17.4535,8.54089 17.351,8.79388C 17.9919,9.49292 18.3787,10.3856 18.3787,11.4773C 18.3787,15.3189 16.0403,16.1642 13.8131,16.4118C 14.1717,16.7205 14.4915,17.3308 14.4915,18.2637C 14.4915,19.6005 14.4792,20.6791 14.4792,21.007C 14.4792,21.2744 14.6597,21.5855 15.1668,21.4878C 19.1374,20.1629 22,16.4172 22,12.0006C 22,6.47712 17.5223,2 11.9991,2 Z "/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="splash-screen__footer">
                <a className="button" onClick={()=>{
                    if(scrollTo!=undefined&& scrollTo.current!=undefined){
                        scrollTo.current.scrollIntoView({behavior: 'smooth'})
                    }}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                        <path
                            d="M 11,4L 13,4L 13,16.0104L 18.5052,10.5052L 19.9194,11.9194L 12,19.8388L 4.08058,11.9194L 5.49479,10.5052L 11,16.0104L 11,4 Z ">
                        </path>
                    </svg>
                    Read more
                </a>
            </div>
        </div>
        <div className="anchor" ref={scrollTo}></div>
        <div className="landing__content">
            <h1>Unrivalled writing experience</h1>
            <div className="row">
                <div className="column">
                    <div className="feature">
                        <h3>Rich Markdown editor</h3>
                        <p>StackEdit’s Markdown syntax highlighting is unique. The refined text formatting of the editor
                            helps you visualize the final rendering of your files.</p>
                    </div>
                </div>
                <div className="column">
                    <div className="image" style={{width: '260px'}}>
                        <img width="230" src={syntaxHighlight} alt="Syntax highlighting"/>
                    </div>
                </div>
            </div>
            <div className="row">
                <img className="image" width="410" src={navigationBar} alt="Navigation bar of the app"/>
                <div className="feature">
                    <h3>WYSIWYG controls</h3>
                    <p>StackEdit provides very handy formatting buttons and shortcuts, thanks to PageDown, the
                        WYSIWYG-style Markdown editor used by Stack Overflow.</p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="feature">
                        <h3>Smart layout</h3>
                        <p>Whether you write, you review, you comment… StackEdit's layout provides you with the
                            flexibility you need, without sacrifice.</p>
                    </div>
                </div>
                <div className="column">
                    <img className="image" width="360" src={smartlayout} alt="Smart layout of the app"/>
                </div>
            </div>
            <div className="row">
                <div className="feature">
                    <h3>Live preview with Scroll Sync</h3>
                    <p>StackEdit’s Scroll Sync feature accurately binds the scrollbars of the editor panel and the
                        preview panel to ensure that you always keep an eye on the output while writing.</p>
                </div>
                <img className="image" width="485" src={scrollSynced} alt="Synced scrolling of the app"/>
            </div>
            <h1>Designed for web writers</h1>
            <div className="row">
                <div className="column">
                    <div className="feature">
                        <h3>Stay connected</h3>
                        <p>StackEdit can sync your files with Google Drive, Dropbox and GitHub. It can also publish them
                            as blog posts to Blogger, WordPress and Zendesk. You can choose whether to upload in
                            Markdown format, HTML, or to format the output using the Handlebars template engine.</p>
                    </div>
                </div>
                <div className="column">
                    <img className="image" width="300" src={providers} alt={"provider"}/>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="feature">
                        <h3>Collaborate</h3>
                        <p>With StackEdit, you can share collaborative workspaces, thanks to the synchronization
                            mechanism. If two collaborators are working on the same file at the same time, StackEdit
                            takes care of merging the changes.</p>
                    </div>
                    <img className="image" width="300" src={workspace} alt={"workspace"}/>
                </div>
                <div className="column">
                    <div className="feature">
                        <h3>Comment</h3>
                        <p>StackEdit allows you to insert inline comments and embed collaborator discussions in your
                            files, just as well as Microsoft Word and Google Docs.</p>
                    </div>
                    <img className="image" width="395" src={discussion} alt="discussion"/>
                </div>
            </div>
            <div className="row">
                <div className="feature">
                    <h3>Write offline!</h3>
                    <p>Even when you travel, StackEdit is still accessible and lets you write offline just like any
                        desktop application. You have no excuse!</p>
                </div>
            </div>
            <h1>Extended Markdown support</h1>
            <div className="row">
                <div className="column">
                    <br/>
                    <div className="image" style={{width: '250px'}}>
                        <img width="230" src={gfm} alt="Gfm for github markdown"/>
                    </div>
                </div>
                <div className="column">
                    <div className="feature">
                        <h3>GitHub Flavored Markdown</h3>
                        <p>StackEdit supports different Markdown flavors such as Markdown Extra, GFM and CommonMark.
                            Each Markdown feature can be enabled or disabled at your convenience.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <br/>
                    <div className="image" style={{width: '270px'}}>
                        <img width="250" src={katex} alt="Katex for LaTeX formulas"/>
                    </div>
                </div>
                <div className="column">
                    <div className="feature">
                        <h3>LaTeX mathematical expressions</h3>
                        <p>StackEdit renders mathematics from LaTeX expressions inside your markdown file, as you would
                            do on Stack Exchange.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="image" style={{width: '300px'}}>
                        <img width="280" src={mermaid} alt="Mermaid for class diagrams"/>
                    </div>
                </div>
                <div className="column">
                    <div className="feature">
                        <h3>UML diagrams</h3>
                        <p>StackEdit enables you to write sequence diagrams and flow charts using a simple syntax.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="image" style={{width: '280px'}}>
                        <img width="260" src={abc} alt="abc"/>
                    </div>
                </div>
                <div className="column">
                    <div className="feature">
                        <h3>Scores</h3>
                        <p>StackEdit can render musical scores using the ABC notation.</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="image" style={{width: '250px'}}>
                        <img width="230" src={tweemoji} alt="tweemoji"/>
                    </div>
                </div>
                <div className="column">
                    <div className="feature">
                        <h3>Emojis</h3>
                        <p>StackEdit supports inserting emojis in your file using the Markdown emoji markup.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="landing__footer">
            <div className="social">
                <a href="https://github.com/SamTV12345/stackedit-react" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                        <path
                            d="M 11.9991,2C 6.47774,2 2.00001,6.47712 2.00001,12.0006C 2.00001,16.4184 4.86504,20.1665 8.83877,21.489C 9.33909,21.5807 9.52142,21.272 9.52142,21.007C 9.52142,20.7696 9.51282,20.1407 9.50791,19.3062C 6.72636,19.9105 6.13948,17.9657 6.13948,17.9657C 5.68459,16.8105 5.02895,16.5029 5.02895,16.5029C 4.121,15.8824 5.09771,15.895 5.09771,15.895C 6.10143,15.9657 6.62936,16.9256 6.62936,16.9256C 7.52135,18.4537 8.97014,18.0125 9.53984,17.7565C 9.63069,17.1102 9.88914,16.6696 10.1746,16.4196C 7.95415,16.1672 5.61952,15.3093 5.61952,11.4773C 5.61952,10.3856 6.00934,9.49292 6.64902,8.79388C 6.54588,8.54089 6.20271,7.52417 6.74723,6.14739C 6.74723,6.14739 7.58643,5.87851 9.49686,7.17252C 10.2943,6.95073 11.1501,6.8398 12.0003,6.83594C 12.8499,6.8398 13.7051,6.95073 14.5038,7.17252C 16.413,5.87851 17.2509,6.14739 17.2509,6.14739C 17.7967,7.52417 17.4535,8.54089 17.351,8.79388C 17.9919,9.49292 18.3787,10.3856 18.3787,11.4773C 18.3787,15.3189 16.0403,16.1642 13.8131,16.4118C 14.1717,16.7205 14.4915,17.3308 14.4915,18.2637C 14.4915,19.6005 14.4792,20.6791 14.4792,21.007C 14.4792,21.2744 14.6597,21.5855 15.1668,21.4878C 19.1374,20.1629 22,16.4172 22,12.0006C 22,6.47712 17.5223,2 11.9991,2 Z "/>
                    </svg>
                </a>
            </div>
            <a target="_blank" href="https://www.apache.org/licenses/LICENSE-2.0"> Apache License</a> –
            <a href="#" onClick={(event)=>{
                event.preventDefault();

                navigate('/privacy')
            }} target="_blank">Privacy Policy</a>
        </div>
    </div>
}
