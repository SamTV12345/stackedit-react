import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const PrivacyPolicy = ()=>{
    const navigate = useNavigate()
    const {t} = useTranslation()
    return <div className="landing" id="landing">
        <div className="navigation-bar">
            <a className="navigation-bar__button button" onClick={()=>navigate("/app")} title="The app">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                    <path
                        d="M 16.8363,2.73375C 16.45,2.73375 16.0688,2.88125 15.7712,3.17375L 13.6525,5.2925L 18.955,10.5962L 21.0737,8.47625C 21.665,7.89 21.665,6.94375 21.0737,6.3575L 17.895,3.17375C 17.6025,2.88125 17.2163,2.73375 16.8363,2.73375 Z M 12.9437,6.00125L 4.84375,14.1062L 7.4025,14.39L 7.57875,16.675L 9.85875,16.85L 10.1462,19.4088L 18.2475,11.3038M 4.2475,15.0437L 2.515,21.7337L 9.19875,19.9412L 8.955,17.7838L 6.645,17.6075L 6.465,15.2925"></path>
                </svg>
                {t('start-writing')}
            </a>
        </div>
        <div className="splash-screen">
            <div className="splash-screen__logo">
                <div className="splash-screen__subtitle">
                    {t('privacy-value')}

                    <div className="social">
                        <a href="https://github.com/benweet/stackedit" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                                <path
                                    d="M 11.9991,2C 6.47774,2 2.00001,6.47712 2.00001,12.0006C 2.00001,16.4184 4.86504,20.1665 8.83877,21.489C 9.33909,21.5807 9.52142,21.272 9.52142,21.007C 9.52142,20.7696 9.51282,20.1407 9.50791,19.3062C 6.72636,19.9105 6.13948,17.9657 6.13948,17.9657C 5.68459,16.8105 5.02895,16.5029 5.02895,16.5029C 4.121,15.8824 5.09771,15.895 5.09771,15.895C 6.10143,15.9657 6.62936,16.9256 6.62936,16.9256C 7.52135,18.4537 8.97014,18.0125 9.53984,17.7565C 9.63069,17.1102 9.88914,16.6696 10.1746,16.4196C 7.95415,16.1672 5.61952,15.3093 5.61952,11.4773C 5.61952,10.3856 6.00934,9.49292 6.64902,8.79388C 6.54588,8.54089 6.20271,7.52417 6.74723,6.14739C 6.74723,6.14739 7.58643,5.87851 9.49686,7.17252C 10.2943,6.95073 11.1501,6.8398 12.0003,6.83594C 12.8499,6.8398 13.7051,6.95073 14.5038,7.17252C 16.413,5.87851 17.2509,6.14739 17.2509,6.14739C 17.7967,7.52417 17.4535,8.54089 17.351,8.79388C 17.9919,9.49292 18.3787,10.3856 18.3787,11.4773C 18.3787,15.3189 16.0403,16.1642 13.8131,16.4118C 14.1717,16.7205 14.4915,17.3308 14.4915,18.2637C 14.4915,19.6005 14.4792,20.6791 14.4792,21.007C 14.4792,21.2744 14.6597,21.5855 15.1668,21.4878C 19.1374,20.1629 22,16.4172 22,12.0006C 22,6.47712 17.5223,2 11.9991,2 Z "/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="splash-screen__footer w-full">
                <div className="flex justify-center text-2xl">
                    <ul className="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-8 h-8 text-green-500 dark:text-green-400"
                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <span>{t('privacy-strong')}</span></li>
                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-8 h-8 text-green-500 dark:text-green-400"
                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <span>{t('source-code-privacy')}</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <svg className="flex-shrink-0 w-8 h-8 text-green-500 dark:text-green-400"
                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <span>{'device-privacy'}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}
