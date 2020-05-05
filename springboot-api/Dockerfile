FROM maven as builder

WORKDIR /tmp

COPY pom.xml /tmp
COPY src /tmp/src

RUN mvn package -DskipTests

# Run from openjdk
FROM openjdk:11.0.7

WORKDIR /app

COPY --from=builder /tmp/target/springboot-api.jar /app/

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "springboot-api.jar"]
