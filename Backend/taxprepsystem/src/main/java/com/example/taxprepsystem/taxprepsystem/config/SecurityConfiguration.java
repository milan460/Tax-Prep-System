package com.example.taxprepsystem.taxprepsystem.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.csrf.*;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.io.IOException;
import java.util.Arrays;
import java.util.function.Supplier;


@Configuration
@EnableMethodSecurity(prePostEnabled = true, jsr250Enabled = true)
public class SecurityConfiguration {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

        return httpSecurity

                //setting the authorization rules for the endpoints
                .authorizeHttpRequests(requests -> {
                    requests.anyRequest().authenticated();
                })

                //setting the login configuration to use OAuth2
                // .oauth2Login(Customizer.withDefaults())
                .oauth2Login(oauth2Login -> oauth2Login
                    .redirectionEndpoint(redirectionEndpoint -> redirectionEndpoint
                        .baseUri("/login/oauth2/code/google")
                    )
                )


                //setting the logout configuration to delete cookies with the session token and redirect to the logout_success page
                .logout(logout -> logout
                        .deleteCookies("accessToken").invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID").invalidateHttpSession(true)
                        .deleteCookies("role").invalidateHttpSession(true)
                        .deleteCookies("XSRF-TOKEN").invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID").invalidateHttpSession(true)
                        .logoutUrl("/logout").logoutSuccessUrl("http://tyler-alex-milan-tax-system.skillstorm-congo.com:5173").permitAll()
                )

                //setting the csrf token to be stored in a cookie
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler())
                )

                //setting the cors configuration
                .cors(cors -> {
                    cors.configurationSource(request -> {

                        //configuring how we want to handle cors
                        CorsConfiguration corsConfig = new CorsConfiguration();

                        //these are the allowed origins, methods, and headers
                        corsConfig.setAllowedOrigins(Arrays.asList("http://tyler-alex-milan-tax-system.skillstorm-congo.com:5173"));
                        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
//                        corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
                        corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-XSRF-TOKEN"));
                        corsConfig.setExposedHeaders(Arrays.asList("X-XSRF-TOKEN"));
                        corsConfig.setAllowCredentials(true);
                        corsConfig.setMaxAge(3600L);

                        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

                        source.registerCorsConfiguration("/**", corsConfig);

                        return corsConfig;
                    });
                })
                .build();
    }




    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(4);
    }

    @Bean
    public CsrfTokenRepository cookieCsrfTokenRepository(){
        CookieCsrfTokenRepository repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        repository.setHeaderName("X-XSRF-TOKEN");
        repository.setCookiePath("/");

        return repository;
    }


}


