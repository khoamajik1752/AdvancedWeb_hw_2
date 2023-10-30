


export default function ApiKey({ apiKey, userApiKey, handleUserApiKeyChange, handleUserApiKeySubmit }) {

    return (
        <>
            <div className="container-fluid api-container d-flex justify-content-between">

                <div className="current-apikey-container">
                    <div> 
                        Current API Key: {apiKey.slice(0, 3)}...{apiKey.slice(-3)}
                    </div>
                    <div>
                        Default API key: jBf...xeM
                    </div>
                </div>
                <form className="apikey-form d-flex flex-row" onSubmit={e => e.preventDefault()} >

                    <input
                        className="form-control me-3"
                        aria-label="Search"
                        type="text"
                        value={userApiKey}
                        placeholder="Enter your API key"
                        onChange={handleUserApiKeyChange}
                    />
                    <button
                        className="btn btn-outline-success"
                        onClick={handleUserApiKeySubmit}
                    >
                        Set API Key
                    </button>
                </form>
            </div>

        </>
    )
}