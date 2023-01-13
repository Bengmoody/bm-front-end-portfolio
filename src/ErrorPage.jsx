function ErrorPage({ code }) {
    if (code >=500 ) {
        return (
            <section className="error-handler__server">
                <p className="error-handler__server--message">
                    There is a problem with our server. <br />
                    The data needed for this page is currently unavailable. <br />
                    Please utilise the links in the navigation section above to try <br />
                    the other parts of our page.
                </p>
            </section>
        )
    } else {

        return (
            <section className="error-handler__user">
                <p className="error-handler__user--message">
                    The page you have tried to access does not exist. <br />
                    Please utilise the links in the navigation section above to return to <br />
                    functional parts of the page.
                </p>
            </section>
        )

    }

}


export default ErrorPage