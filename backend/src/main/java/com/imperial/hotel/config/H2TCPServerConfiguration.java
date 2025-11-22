package com.imperial.hotel.config;

import org.h2.tools.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import java.sql.SQLException;

@Profile("dev")
@Configuration
public class H2TCPServerConfiguration {

    @Bean(initMethod = "start", destroyMethod = "stop")
    public Server h2TCPServer() throws SQLException {
        return Server.createTcpServer("-tcpPort", "9092", "-tcpAllowOthers");
    }
}
