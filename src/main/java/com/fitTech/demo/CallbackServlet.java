package com.fitTech.demo;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;

import java.io.IOException;

public class CallbackServlet {
    @WebServlet(urlPatterns = {"/callback"})
    public class CallbackServlet extends HttpServlet {

        private String redirectOnSuccess;
        private String redirectOnFail;
        private AuthenticationController authenticationController;

        @Override
        public void init(ServletConfig config) throws ServletException {
            super.init(config);
            redirectOnSuccess = "/portal/home";
            redirectOnFail = "/login";
            authenticationController = AuthenticationControllerProvider.getInstance(config);
        }

        @Override
        public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
            handle(req, res);
        }

        @Override
        public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
            handle(req, res);
        }

        private void handle(HttpServletRequest req, HttpServletResponse res) throws IOException {
            try {
                // Parse the request
                Tokens tokens = authenticationController.handle(req, res);
                SessionUtils.set(req, "accessToken", tokens.getAccessToken());
                SessionUtils.set(req, "idToken", tokens.getIdToken());
                res.sendRedirect(redirectOnSuccess);
            } catch (IdentityVerificationException e) {
                e.printStackTrace();
                res.sendRedirect(redirectOnFail);
            }
        }
    }
}
