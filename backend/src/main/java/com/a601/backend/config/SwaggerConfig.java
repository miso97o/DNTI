package com.a601.backend.config;

import com.fasterxml.classmate.TypeResolver;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Autowired
    private TypeResolver typeResolver;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)


                .alternateTypeRules(// swagger의 요청 parameter 재정의 하기 위한 코드
                        AlternateTypeRules.newRule(typeResolver.resolve(Pageable.class),typeResolver.resolve(Page.class)))
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.a601.backend.api.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    @Getter
    @Setter
    @ApiModel
    static class Page {
        @ApiModelProperty(value = "페이지 번호(0..N)")
        private Integer page;

        @ApiModelProperty(value = "페이지 크기", allowableValues = "range[0,100]")
        private Integer size;

        @ApiModelProperty(value = "정렬(사용법 : 컬럼명,ASC|DESC)")
        private List<String> sort;
    }

    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("동네TI API")
                .description("동네TI 관련 테스트 API 상세소개 및 사용법")
                .version("1.0")
                .build();
    }

}