#!/bin/sh

#head -1 dependency.txt | sed -e "s/Current Build.*//" | wc -m

if [ $# -ne 3 ]; then
    echo "usage: $0 <Dependency file> <artifact name> <artifact version>"
    exit 1
fi

fileDependency=$1
artifactName=$2
artifactVersion=$3
artifactPrefix=`echo ${artifactName} | tr '[a-z]' '[A-Z]'`

if  [ ! -f "$fileDependency" ]
then
echo "[$fileDependency]: No such file!!"
exit 1
fi

columnWidth=`head -1 $fileDependency | sed -e "s/ Current Build.*//" | wc -m`

artifactNameWith=`echo -e -n "$artifactName" | wc -m`

columnSpacing=`expr $columnWidth - $artifactNameWith`

if [ "$columnSpacing" -le "0" ]
then
    columnSpacing=1
fi

artifactPadding=`yes " " 2>/dev/null | head -n $columnSpacing | tr -d "\n"`

echo -e -n "${artifactName}${artifactPadding}${artifactPrefix}_${artifactVersion}\n" >>$fileDependency