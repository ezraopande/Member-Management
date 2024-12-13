export const renderJSON = (json) => {
    if (Array.isArray(json)) {
        return (
            <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '16px', borderRadius: '4px' }}>
                [
                {json.map((item, index) => (
                    <div key={index} style={{ marginLeft: '16px' }}>
                        {"{"}
                        {Object.entries(item).map(([key, value], idx) => (
                            <div key={idx} style={{ marginLeft: '16px' }}>
                                <span style={{ color: '#9cdcfe' }}>"{key}"</span>:{" "}
                                {typeof value === 'object' ? (
                                    renderJSON(value)
                                ) : (
                                    <span style={{ color: '#ce9178' }}>
                                        {typeof value === 'string' ? `"${value}"` : value}
                                    </span>
                                )}
                                {idx < Object.entries(item).length - 1 && ","}
                            </div>
                        ))}
                        {"},"}
                    </div>
                ))}
                ]
            </pre>
        );
    } else if (typeof json === 'object' && json !== null) {
        return (
            <pre style={{ backgroundColor: '#1e1e1e', color: '#dcdcdc', padding: '16px', borderRadius: '4px' }}>
                {"{"}
                {Object.entries(json).map(([key, value], index) => (
                    <div key={index} style={{ marginLeft: '16px' }}>
                        <span style={{ color: '#9cdcfe' }}>"{key}"</span>:{" "}
                        {typeof value === 'object' ? (
                            renderJSON(value)
                        ) : (
                            <span style={{ color: '#ce9178' }}>
                                {typeof value === 'string' ? `"${value}"` : value}
                            </span>
                        )}
                        {index < Object.entries(json).length - 1 && ","}
                    </div>
                ))}
                {"}"}
            </pre>
        );
    }
    return null;
};