import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error + errorInfo)
    }

    render() {
        const { hasError, error } = this.state;

        if (hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <p>{error} </p>
                    {error.message && <span>Here's the error: {error.message}</span>}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;