package com.fitTech.demo;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class LoginServlet {
    @WebServlet(urlPatterns = {"/login"})
    public class LoginServlet extends HttpServlet {
        private AuthenticationController authenticationController;
        private String domain;

        @Override
        public void init(ServletConfig config) throws ServletException {
            super.init(config);
            domain = config.getServletContext().getInitParameter("com.auth0.domain");
            authenticationController = AuthenticationControllerProvider.getInstance(config);
        }

        @Override
        protected void doGet(final HttpServletRequest req, final HttpServletResponse res) throws ServletException, IOException {
            String redirectUri = req.getScheme() + "://" + req.getServerName();
            if ((req.getScheme().equals("http") && req.getServerPort() != 80) || (req.getScheme().equals("https") && req.getServerPort() != 443)) {
                redirectUri += ":" + req.getServerPort();
            }
            redirectUri += "http://localhost:3000/callback";

            String authorizeUrl = authenticationController.buildAuthorizeUrl(req, res, redirectUri)
                    .build();
            res.sendRedirect(authorizeUrl);
        }
    }
}
