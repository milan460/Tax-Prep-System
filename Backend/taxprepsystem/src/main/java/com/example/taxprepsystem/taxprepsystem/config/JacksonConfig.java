package com.example.taxprepsystem.taxprepsystem.config;

import com.example.taxprepsystem.taxprepsystem.custom_serializers.GrantedAuthorityDeserializer;
import com.example.taxprepsystem.taxprepsystem.custom_serializers.GrantedAuthoritySerializer;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.security.core.GrantedAuthority;

import java.text.SimpleDateFormat;

@Configuration
public class JacksonConfig {

    //mapping the custom serializer and deserializer to the ObjectMapper
    @Bean
    public ObjectMapper objectMapper() {

        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule("CustomModule");
        module.addSerializer(GrantedAuthority.class, new GrantedAuthoritySerializer());
        module.addDeserializer(GrantedAuthority.class, new GrantedAuthorityDeserializer());

        //setting the date format
        mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ"));

        //registering the module to the ObjectMapper
        mapper.registerModule(module);

        //registering the JavaTimeModule to the ObjectMapper
        mapper.registerModule(new JavaTimeModule());

        //ignoring unknown properties
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        return mapper;
    }



}
