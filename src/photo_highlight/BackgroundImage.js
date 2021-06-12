import SyncLoader from "react-spinners/SyncLoader";
import {useState, useEffect} from 'react';

export default function BackgroundImage(props) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const src = props.src;
        let imageLoader = new Image();
        imageLoader.src = src;
        imageLoader.onload = () => {
            setUrl(src);
        };
    }, [])
    
    if (url) {
        return (
            <div className={props.className} style={{ backgroundImage: `url(${url})` }} onClick={props.onClick}/>
        );
    }
    return (
        <div className="highlight_loader">
            <SyncLoader className={props.className} color={"#123abc"} speedMultiplier={1.3} />
        </div>
    );
}