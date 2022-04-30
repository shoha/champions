if [ ! -d "java" ]; then
  mkdir java
  cd java
  wget https://download.oracle.com/java/18/latest/jdk-18_linux-x64_bin.tar.gz -q
  tar zxf jdk-18_linux-x64_bin.tar.gz
  # ./jdk-18.0.1/bin/java -version
  rm jdk-18_linux-x64_bin.tar.gz
fi
